const bcrypt = require('bcryptjs');

// 密码加密
exports.passwordEncrypt = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// 校验密码
exports.verifyPassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
