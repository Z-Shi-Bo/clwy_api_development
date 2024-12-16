const { body, param } = require('express-validator');
const { validate } = require('./index');
const { Course } = require('../models');

// 统一判断课程是否存在
const checkCourseExists = async (value) => {
  const course = await Course.findByPk(value);
  if (!course) {
    return Promise.reject('课程不存在');
  }
};

// 创建课程验证
exports.createCourseValidate = validate([
  body('title').notEmpty().withMessage('标题不能为空'),
  body('content').notEmpty().withMessage('内容不能为空'),
]);

// 删除课程验证和获取课程详情验证
exports.deleteAndGetDetailValidate = validate([
  param('id').notEmpty().withMessage('ID不能为空'),
  param('id').isInt().withMessage('ID必须是整数'),
  param('id').custom(checkCourseExists),
]);

// 更新课程验证
exports.updateCourseValidate = validate([
  param('id').notEmpty().withMessage('ID不能为空'),
  param('id').isInt().withMessage('ID必须是整数'),
  param('id').custom(checkCourseExists),
  body('title').notEmpty().withMessage('标题不能为空'),
  body('content').notEmpty().withMessage('内容不能为空'),
]);
