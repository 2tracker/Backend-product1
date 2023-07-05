const jwt = require("jsonwebtoken");
const bcryptjs = require('bcryptjs');

const jwtSecretKey = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRATION;
const saltKey = '$2a$10$RJhCpxAOzQtlWLekXY4zW.';

exports.generateToken = async (jwtPayload) => {
  return jwt.sign(jwtPayload, jwtSecretKey, { expiresIn });
};

exports.compareHashData = async (data, encryptedData) => {
  return bcryptjs.compareSync(data, encryptedData);
};

exports.hashData = async (data) => {
  return bcryptjs.hashSync(data, saltKey);
};