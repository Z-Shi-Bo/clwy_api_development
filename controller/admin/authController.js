const { Op } = require('sequelize');
// 引入服务
const { sign_in } = require('../../service/admin/authService');
const { verifyPassword, jwtSign } = require('../../utils/passwordEncrypt');
// 登录
exports.sign_in = async (req, res) => {
  const { login = '', password = '' } = req.body;
  const params = {
    where: {
      [Op.or]: [{ username: login }, { email: login }],
    },
  };
  const result = await sign_in(params);
  if (!result) {
    return res.error('用户不存在', 401);
  }
  // 判断是不是管理员
  if (result.role !== 100) {
    return res.error('用户不是管理员，无法登录！', 401);
  }
  // 判断密码是否正确
  const isPasswordValid = await verifyPassword(password, result.password);
  if (!isPasswordValid) {
    return res.error('密码错误', 401);
  }
  const token = await jwtSign({ ...result.toJSON(), password: null });
  return res.success({ token }, '登录成功');
};
