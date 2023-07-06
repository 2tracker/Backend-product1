const Admin = require("../Model/Admin");
const Tesseract = require('tesseract.js');
const {
  generateToken,
  hashData,
  compareHashData,
} = require("../utils/hashing");

const twilio = require("twilio")(
  "ACae715cfb25d56d67e9e836b2bd08526e",
  "073352b76f3af208ea2fbca0d85d2d76"
);
const nodemailer = require("nodemailer");

exports.Register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      mobile_number,
      password,
      confirm_password,
    } = req.body;
    console.log(password, "password");
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }
    if (password !== confirm_password) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    const Hashpassword = await hashData(password);

    const pan_Card = req.files["pan_card"] ? req.files["pan_card"][0] : null;
    const aadhar_Card = req.files["aadhar_card"]
      ? req.files["aadhar_card"][0]
      : null;

    const newAdmin = new Admin({
      first_name,
      last_name,
      email,
      mobile_number,
      password: Hashpassword,
      confirm_password: Hashpassword,
      pan_card: pan_Card,
      aadhar_card: aadhar_Card,
    });

    await newAdmin.save();
    res.json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Registration failed" });
  }
};

exports.SendOtp = async (req, res) => {
  const { email, mobile_number } = req.body;
  const otpExpiryMinutes = 20;
  if (!email && !mobile_number) {
    return res
      .status(400)
      .json({ error: "Please provide either an email or a phone number" });
  }
  const otp = generateOTP();
  const otpExpiration = new Date();
  otpExpiration.setMinutes(otpExpiration.getMinutes() + otpExpiryMinutes);
  try {
    let admin;

    if (email) {
      admin = await Admin.findOne({ email: email });

      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }
    } else if (mobile_number) {
      admin = await Admin.findOne({ mobile_number: mobile_number });

      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }
    }

    admin.otp = otp;
    admin.otpExpiration = otpExpiration;

    await admin.save();
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
        res.send({ MSG: "sendOTP", otp: mailOptions });
      });
    } else if (mobile_number) {
      twilio.messages
        .create({
          body: `Your OTP: ${otp}`,
          from: "+19282851652",
          to: mobile_number,
        })
        .then(() => {
          res.send({ MSG: "sendOTP", otp: twilio.messages });
        })
        .catch(() => {
          res.status(500).json({ error: "Failed to send OTP via SMS" });
        });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to store OTP" });
  }
  function generateOTP() {
    const digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }
};

exports.Login = async (req, res) => {
  const { email, mobile_number, otp } = req.body;
  if (!email && !mobile_number) {
    return res
      .status(400)
      .json({ error: "Please provide either an email or a mobile number" });
  } else {
    if (email) {
      console.log(email, "email");
      const admin = await Admin.findOne({ email: email });
      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      } else {
        console.log(admin?.otp, "admin");
        console.log(otp, "otp");
        if (admin?.otp != otp) {
          return res.status(404).json({ error: "otp not found" });
        } else {
          const payload = { AdminId: admin._id };
          const token = await generateToken(payload);
          res.json({
            MSG: "LOgin SuccessFully DOne ",
            data: admin,
            Token: token,
          });
        }
      }
    } else if (mobile_number) {
      const admin = await Admin.findOne({ mobile_number: mobile_number });
      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      } else {
        if (admin.otp !== otp) {
          return res.status(404).json({ error: "otp not found" });
        } else {
          const payload = { AdminId: admin._id };
          const token = await generateToken(payload);
          res.json({
            MSG: "LOgin SuccessFully DOne ",
            data: admin,
            Token: token,
          });
        }
      }
    }
  }
};

exports.PancardTOJson = async (req, res) => {
  try {
    let id = req.params.id
    const image = await Admin.findById(id);

    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    console.log(image.pan_card[0].path,'image.pan_card.path')
    const {data} = await Tesseract.recognize(image?.pan_card[0]?.path);
    const imageText = data.text;
    const text = imageText.toString()
    console.log(text,'textttttssss ')
    const jsonFormat = {
      imageText: imageText.toString(),
    };
    res.json({MSG:"Convert TO Json",Data:jsonFormat});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.AadharTOJson = async (req, res) => {
  try {
    let id = req.params.id
    const image = await Admin.findById(id);

    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    console.log(image.aadhar_card[0].path,'image.pan_card.path')
    const {data} = await Tesseract.recognize(image?.aadhar_card[0]?.path);
    const imageText = data.text;
    const text = imageText.toString()
    console.log(text,'textttttssss ')
    const jsonFormat = {
      imageText: imageText.toString(),
    };
    res.json({MSG:"Convert TO Json",Data:jsonFormat});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
