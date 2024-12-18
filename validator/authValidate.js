const { body } = require('express-validator');
const { validate } = require('../validator');

// 登录验证 用户名或者邮箱
exports.loginValidate = validate([
  body('login').notEmpty().withMessage('用户名或邮箱不能为空'),
  body('password').notEmpty().withMessage('密码不能为空'),
]);
