const { User } = require('../../models');

// 登录
exports.sign_in = async (params) => {
  const result = await User.findOne(params);
  return result;
};
