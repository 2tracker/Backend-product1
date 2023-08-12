const User = require("../Model/User");
const mail = require('../services/Alltemplate')
const moment = require('moment');
const {
  generateToken,
  hashData,
  compareHashData,
} = require("../utils/hashing");
const twilio = require("twilio");
const nodemailer = require("nodemailer");

exports.RegisterUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      mobileNumber,
      DOB,
      password,
      confirm_password,
      aadharCard,
      profilePhoto,
      salary,
      role,
      income,
      totalTraineePeriods,
      incrementMonths,
      incrementSalary,
    } = req.body;
    const existingUser = await User.findOne({
      $or: [{ email }, { mobileNumber }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email or mobile number already exists" });
    }
    if (password !== confirm_password) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    const Hashpassword = await hashData(password);

    const profile_Photo = req.files["profilePhoto"]
      ? req.files["profilePhoto"][0]
      : null;
    const aadhar_Card = req.files["aadharCard"]
      ? req.files["aadharCard"][0]
      : null;

    const newUser = new User({
      firstName,
      lastName,
      email,
      mobileNumber,
      DOB,
      role,
      password: Hashpassword,
      confirm_password: Hashpassword,
      aadharCard: aadhar_Card,
      profilePhoto: profile_Photo,
      salary,
      income,
      totalTraineePeriods,
      incrementMonths,
      incrementSalary,
    });
    await newUser.save();
    res.json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Registration failed" });
  }
};

exports.SendOtp = async (req, res) => {
  const { email, mobileNumber } = req.body;
  const otpExpiryMinutes = 20;

  if (!email && !mobileNumber) {
    return res
      .status(400)
      .json({ error: "Please provide either an email or a phone number" });
  }

  const otp = generateOTP();
  const otpExpiration = new Date();
  otpExpiration.setMinutes(otpExpiration.getMinutes() + otpExpiryMinutes);

  try {
    let user;
    if (email) {
      user = await User.findOne({ email: email });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
    } else if (mobileNumber) {
      user = await User.findOne({ mobileNumber: mobileNumber });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
    }

    user.otp = otp;
    user.otpExpiration = otpExpiration;

    await user.save();

    if (email) {
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.MAIL_FROM,
        to: email,
        subject: "OTP Verification",
        html: mail.SendOTP(otp),
      };

      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          return res
            .status(500)
            .json({ error: "Failed to send OTP via email" });
        }
        res.send({ MSG: "sendOTP", otp: otp });
      });
    } else if (mobileNumber) {
      const accountSid = "ACae715cfb25d56d67e9e836b2bd08526e";
      const authToken = "dbbc4a3175bc8efa09dd5e66eb6b7628";
      const twilioClient = twilio(accountSid, authToken);

      twilioClient.messages
        .create({
          body: `Your OTP: ${otp}`,
          from: "+19282851652",
          to: `+91${mobileNumber}`,
        })
        .then(() => {
          res.send({ MSG: "sendOTP", otp: otp });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ error: "Failed to send OTP via SMS" });
        });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to store OTP" });
  }
};

function generateOTP() {
  const digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

exports.Login = async (req, res) => {
  const { email, mobileNumber, otp } = req.body;
  console.log(otp, "otp");
  if (!email && !mobileNumber) {
    return res
      .status(400)
      .json({ error: "Please provide either an email or a mobile number" });
  } else {
    if (email) {
      console.log(email, "email");
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      } else {
        console.log(user?.otp, "user");
        console.log(otp, "otp");
        if (user?.otp != otp) {
          return res.status(404).json({ error: "otp not found" });
        } else {
          const payload = { userId: user._id };
          const token = await generateToken(payload);
          res.json({
            MSG: "Login SuccessFully Done ",
            data: user,
            Token: token,
          });
        }
      }
    } else if (mobileNumber) {
      const user = await User.findOne({ mobileNumber: mobileNumber });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      } else {
        console.log(user?.otp, "user");

        if (user.otp !== otp) {
          return res.status(404).json({ error: "otp not found" });
        } else {
          const payload = { userId: user._id };
          const token = await generateToken(payload);
          res.json({
            MSG: "Login SuccessFully Done ",
            data: user,
            Token: token,
          });
        }
      }
    }
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.find({});
    if (user) {
      return res.status(200).send({ message: "Query successful", user });
    } else {
      return res.status(404).send({ message: "Target User not found" });
    }
  } catch (err) {
    console.log(err, "errr");
  }
};

exports.getbyidUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id });
    if (user) {
      return res.status(200).send({ message: "Query successful", user });
    } else {
      return res.status(404).send({ message: "Target User not found" });
    }
  } catch (err) {
    console.log(err, "errr");
  }
};

exports.UpdateUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      DOB,
      mobileNumber,
      password,
      role,
      confirm_password,
      salary,
      aadharCard,
      profilePhoto,
      income,
      totalTraineePeriods,
      incrementMonths,
      incrementSalary,
    } = req.body;

    const existingAdmin = await User.findOne({ email: email });
    console.log(existingAdmin, "existingAdmin");
    if (!existingAdmin) {
      return res.status(404).json({ error: "User not found" });
    }
    if (password && password !== confirm_password) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    let profile_Photo = null;
    if (req.files && req.files["profilePhoto"]) {
      profile_Photo = req.files["profilePhoto"][0];
    }
    let aadhar_Card = null;
    if (req.files && req.files["aadharCard"]) {
      aadhar_Card = req.files["aadharCard"][0];
    }

    const updateFields = {
      firstName,
      lastName,
      email,
      mobileNumber,
      DOB,
      role,
      aadharCard: aadharCard || aadhar_Card,
      profilePhoto: profilePhoto || profile_Photo,
      salary,
      income,
      totalTraineePeriods,
      incrementMonths,
      incrementSalary,
    };

    if (password) {
      const Hashpassword = await hashData(password);
      updateFields.password = Hashpassword;
      updateFields.confirm_password = Hashpassword;
    }

    const updatedAdmin = await User.findByIdAndUpdate(
      existingAdmin._id,
      updateFields,
      { new: true }
    );
    if (!updatedAdmin) {
      return res.status(500).json({ error: "Failed to update User" });
    }
    res.json({ message: "Admin updated successfully", User: updatedAdmin });
  } catch (error) {
    console.error("Error during user update:", error);
    res.status(500).json({ error: "User update failed" });
  }
};

exports.DeleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await User.findByIdAndRemove(id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error during admin deletion:", error);
    res.status(500).json({ error: "User deletion failed" });
  }
};


exports.getDOBDate = async (req, res) => {
  try {
    const users = await User.find({}).select('-_id firstName lastName DOB role');
    if (!users || users.length === 0) {
      return res.status(404).send({ message: "Target User not found" });
    }
    const today = moment(); 
    const usersWithDaysToBday = users.map(user => {
      const dob = moment(user.DOB);
      const dayOfWeek = dob.format('dddd');
      const nextBday = dob.clone().year(today.year());
      if (nextBday.isBefore(today) || nextBday.isSame(today, 'day')) {
        nextBday.add(1, 'year');
      }
      const daysToBday = nextBday.diff(today, 'days');
      return { ...user.toObject(), dayOfWeek, daysToBday };
    });
    return res.status(200).send({ message: "Query successful", users: usersWithDaysToBday });
  } catch (err) {
    console.log(err, "errr");
    return res.status(500).send({ message: "Internal Server Error" });
  }
};


exports.BdaySendMail = async (req, res) => {
  try {
    const today = moment();
    const users = await User.find({
      $expr: {
        $and: [
          { $eq: [{ $dayOfMonth: '$DOB' }, today.date()] },
          { $eq: [{ $month: '$DOB' }, today.month() + 1] },
        ],
      },
    });

    if (users.length === 0) {
      return res.json({ message: 'No users with birthdays today.' });
    }

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    for (const user of users) {
      const formattedBirthday = moment(user.DOB).format('MMMM D');
      const mailOptions = {
        from: process.env.MAIL_FROM,
        to: user.email,
        subject: 'Happy Birthday!',
        html: mail.birthDay(user,formattedBirthday),
      };
      await transporter.sendMail(mailOptions);
      console.log(`Birthday wishes sent to ${user.firstName} ${user.lastName}  at ${user.email}`);
    }

    res.json({ MSG:`Birthday wishes sent`});
  } catch (err) {
    console.error('Error sending birthday wishes:', err);
    res.status(500).json({ error: 'Failed to send birthday wishes.' });
  }
};


exports.getUsers = async (req, res) => {

    const id = req.query.id;
    const firstName = req.query.firstName;
    try {
    const user = id ? await User.findById(id)
    : await User.findOne({firstName:firstName})
    const {password,...other} = user.doc;
    res.send(other)
    
  } catch (err) {
    console.log(err, "errr");
  }
};