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
  body('categoryId').notEmpty().withMessage('分类ID不能为空'),
  body('name').notEmpty().withMessage('课程名称不能为空'),
  body('recommended').notEmpty().withMessage('是否推荐不能为空'),
  body('introductory').notEmpty().withMessage('是否为入门课程不能为空'),
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
  body('categoryId').notEmpty().withMessage('分类ID不能为空'),
  body('name').notEmpty().withMessage('课程名称不能为空'),
  body('recommended').notEmpty().withMessage('是否推荐不能为空'),
  body('introductory').notEmpty().withMessage('是否为入门课程不能为空'),
]);
