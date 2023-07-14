const Admin = require("../Model/Admin");
const Tesseract = require("tesseract.js");
const {
  generateToken,
  hashData,
  compareHashData,
} = require("../utils/hashing");

const twilio = require("twilio");
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
        res.send({ MSG: "sendOTP", otp: otp });
      });
    } else if (mobile_number) {
      const accountSid = "ACae715cfb25d56d67e9e836b2bd08526e";
      const authToken = "dbbc4a3175bc8efa09dd5e66eb6b7628";
      const twilioClient = twilio(accountSid, authToken);

      twilioClient.messages
        .create({
          body: `Your OTP: ${otp}`,
          from: "+19282851652",
          to: `+91${mobile_number}`,
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
            MSG: "Login SuccessFully Done ",
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
            MSG: "Login SuccessFully Done ",
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
    let id = req.params.id;
    const image = await Admin.findById(id);

    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    console.log(image.pan_card[0].path, "image.pan_card.path");
    const { data } = await Tesseract.recognize(image?.pan_card[0]?.path);
    const imageText = data.text;
    const text = imageText.toString();
    console.log(text, "textttttssss ");
    const jsonFormat = {
      imageText: imageText.toString(),
    };
    res.json({ MSG: "Convert TO Json", Data: jsonFormat });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.AadharTOJson = async (req, res) => {
  try {
    let id = req.params.id;
    const image = await Admin.findById(id);

    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    console.log(image.aadhar_card[0].path, "image.pan_card.path");
    const { data } = await Tesseract.recognize(image?.aadhar_card[0]?.path);
    const imageText = data.text;
    const text = imageText.toString();
    console.log(text, "textttttssss ");
    const jsonFormat = {
      imageText: imageText.toString(),
    };
    res.json({ MSG: "Convert TO Json", Data: jsonFormat });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAdmin = async (req, res) => {
  try {
    const admin = await Admin.find({});
    if (admin) {
      return res.status(200).send({ message: "Query successful", admin });
    } else {
      return res.status(404).send({ message: "Target User not found" });
    }
  } catch (err) {
    console.log(err, "errr");
  }
};

exports.getbyidAdmin = async (req, res) => {
  try {
    const id = req.params.id
    const admin = await Admin.findOne({_id:id});
    if (admin) {
      return res.status(200).send({ message: "Query successful", admin });
    } else {
      return res.status(404).send({ message: "Target Admin not found" });
    }
  } catch (err) {
    console.log(err, "errr");
  }
};


exports.UpdateAdmin = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      mobile_number,
      password,
      confirm_password,
    } = req.body;
    const existingAdmin = await Admin.findOne({email:email });
    if (!existingAdmin) {
      return res.status(404).json({ error: "Admin not found" });
    }
    if (password && password !== confirm_password) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const pan_Card = req.files["pan_card"] ? req.files["pan_card"][0] : null;
    const aadhar_Card = req.files["aadhar_card"]
      ? req.files["aadhar_card"][0]
      : null;


    const updateFields = {
      first_name,
      last_name,
      email,
      mobile_number,
      pan_card: pan_Card,
      aadhar_card: aadhar_Card,
    };
    if (password) {
      const Hashpassword = await hashData(password);
      updateFields.password = Hashpassword;
      updateFields.confirm_password = Hashpassword;
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(
      existingAdmin._id,
      updateFields,
      { new: true }
    );
    if (!updatedAdmin) {
      return res.status(500).json({ error: "Failed to update Admin" });
    }
    res.json({ message: "Admin updated successfully", Admin: updatedAdmin });
  } catch (error) {
    console.error("Error during user update:", error);
    res.status(500).json({ error: "Admin update failed" });
  }
};


exports.DeleteAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const admin = await Admin.findOne({_id:id});
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }
    await Admin.findByIdAndRemove(id);

    res.json({ message: "Admin deleted successfully" });
  } catch (error) {
    console.error("Error during admin deletion:", error);
    res.status(500).json({ error: "Admin deletion failed" });
  }
};

