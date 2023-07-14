const User = require("../Model/User");
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
      password,
      confirm_password,
      aadharCard,
      profilePhoto,
      salary,
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

    const profile_Photo = req.files["profilePhoto"] ? req.files["profilePhoto"][0] : null;
    const aadhar_Card = req.files["aadharCard"]
      ? req.files["aadharCard"][0]
      : null;


    const newUser = new User({
      firstName,
      lastName,
      email,
      mobileNumber,
      password:Hashpassword,
      confirm_password:Hashpassword,
      aadharCard:aadhar_Card,
      profilePhoto:profile_Photo,
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
          host: "smtp.ethereal.email",
          port: 587,
          auth: {
            user: "jaida.bartoletti@ethereal.email",
            pass: "gekTgXXJXPT9fUGdfw",
          },
        });
  
        const mailOptions = {
          from: "Treacker@gmail.com",
          to: email,
          subject: "OTP Verification",
          text: `Your OTP: ${otp}`,
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
