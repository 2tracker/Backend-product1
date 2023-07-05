const Admin = require("../Model/Admin");
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
const jwt = require("jsonwebtoken");

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
exports.Login = async (req, res) => {
  
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
  const otpData = {
    otp,
    otpExpiration,
  };

  try {
    await Admin.updateOne(otpData);

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
        res.send("sendOTP")
      });
    } else if (phone) {
      twilio.messages
        .create({
          body: `Your OTP: ${otp}`,
          from: "+19282851652",
          to: mobile_number,
        })
        .then(() => {
          res.send("sendOTP")
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
