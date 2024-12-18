const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 密码加密
exports.passwordEncrypt = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// 校验密码
exports.verifyPassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

// 生成token
exports.jwtSign = async (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// 验证token
exports.jwtVerify = async (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
