
const jwt = require("jsonwebtoken");
const Admin = require("../Model/Admin");
const User = require('../Model/User')

const secret = 'AbcdWQREYT567123BvNcMxz';

const Adminguard = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) {
    return res.send({ MSG: "Unauthorized Request" });
  }
  try {
    const decoded = jwt.verify(token, secret);
    console.log(decoded,'decoded')
    console.log(decoded.AdminId, "decoded");
    const user = await Admin.findOne({
        id: decoded.AdminId
    });
    req.user = user;
    return next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return res.send({ MSG: "Token Expired Please Login Again " });
    } else if (
      err instanceof jwt.JsonWebTokenError ||
      err instanceof jwt.NotBeforeError
    ) {
      return res.send({ MSG: "Token Expired Please Login Again" });
    } else {
      return res.send({ MSG: "Error verifying token" });
    }
  }
};

const Userguard = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) {
    return res.send({ MSG: "Unauthorized Request" });
  }
  try {
    const decoded = jwt.verify(token, secret);
    console.log(decoded,'decoded')
    console.log(decoded.AdminId, "decoded");
    const user = await User.findOne({
        id: decoded.AdminId
    });
    req.user = user;
    return next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return res.send({ MSG: "Token Expired Please Login Again " });
    } else if (
      err instanceof jwt.JsonWebTokenError ||
      err instanceof jwt.NotBeforeError
    ) {
      return res.send({ MSG: "Token Expired Please Login Again" });
    } else {
      return res.send({ MSG: "Error verifying token" });
    }
  }
};

module.exports = {
    Adminguard,
    Userguard
  };
  