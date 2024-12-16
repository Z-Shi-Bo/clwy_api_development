const { body, param } = require('express-validator');
const { validate } = require('./index');
const { User } = require('../models');

// 统一判断用户是否存在
const checkUserExists = async (value) => {
  const user = await User.findByPk(value);
  if (!user || user.status === 0) {
    return Promise.reject('用户不存在');
  }
};

// 统一判断除了自己之外的邮箱是否存在
const checkEmailExists = async (value, { req }) => {
  const user = await User.findOne({ where: { email: value } });
  if (user && user.id !== +req.params.id) {
    return Promise.reject('邮箱已存在');
  }
  return Promise.resolve();
};

// 统一判断用户名是否存在
const checkUsernameExists = async (value, { req }) => {
  const user = await User.findOne({ where: { username: value } });
  if (user && user.id !== +req.params.id) {
    return Promise.reject('用户名已存在');
  }
  return Promise.resolve();
};

// 创建用户验证
const userValidationRules = [
  body('email')
    .notEmpty()
    .withMessage('邮箱不能为空')
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .withMessage('邮箱格式不正确，只能包含英文字母、数字和特殊字符')
    .custom(checkEmailExists),
  body('username')
    .notEmpty()
    .withMessage('用户名不能为空')
    .custom(checkUsernameExists),
  body('password').notEmpty().withMessage('密码不能为空'),
  body('nickname').notEmpty().withMessage('昵称不能为空'),
  body('role').notEmpty().withMessage('角色不能为空'),
  body('sex').notEmpty().withMessage('性别不能为空'),
];

exports.createUserValidate = validate(userValidationRules);

// 删除和获取用户详情验证
const idValidationRules = [
  param('id')
    .notEmpty()
    .withMessage('ID不能为空')
    .isInt()
    .withMessage('ID必须是整数')
    .custom(checkUserExists),
];

exports.deleteAndGetDetailValidate = validate(idValidationRules);

// 更新用户验证
exports.updateUserValidate = validate([
  ...idValidationRules,
  ...userValidationRules,
]);
