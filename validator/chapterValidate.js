const { body, param } = require('express-validator');
const { validate } = require('./index');
const { Chapter } = require('../models');

// 统一判断章节是否存在
const checkChapterExists = async (value) => {
  const course = await Chapter.findByPk(value);
  if (!course) {
    return Promise.reject('章节不存在');
  }
};

// 创建章节验证
exports.createChapterValidate = validate([
  body('courseId').notEmpty().withMessage('课程ID不能为空'),
  body('title').notEmpty().withMessage('章节标题不能为空'),
  body('content').notEmpty().withMessage('章节内容不能为空'),
  body('rank').notEmpty().withMessage('排序不能为空'),
]);

// 删除章节验证和获取章节详情验证
exports.deleteAndGetDetailValidate = validate([
  param('id').notEmpty().withMessage('ID不能为空'),
  param('id').isInt().withMessage('ID必须是整数'),
  param('id').custom(checkChapterExists),
]);

// 更新章节验证
exports.updateChapterValidate = validate([
  param('id').notEmpty().withMessage('ID不能为空'),
  param('id').isInt().withMessage('ID必须是整数'),
  param('id').custom(checkChapterExists),
  body('courseId').notEmpty().withMessage('课程ID不能为空'),
  body('title').notEmpty().withMessage('章节标题不能为空'),
  body('content').notEmpty().withMessage('章节内容不能为空'),
  body('rank').notEmpty().withMessage('排序不能为空'),
]);
