const { body, param } = require('express-validator');
const { validate } = require('./index');
const { Article } = require('../models');

// 统一判断文章是否存在
const checkArticleExists = async (value) => {
  const article = await Article.findByPk(value);
  if (!article) {
    return Promise.reject('文章不存在');
  }
};

// 创建文章验证
exports.createArticleValidate = validate([
  body('title').notEmpty().withMessage('标题不能为空'),
  body('content').notEmpty().withMessage('内容不能为空'),
]);

// 删除文章验证和获取文章详情验证
exports.deleteAndGetDetailValidate = validate([
  param('id').notEmpty().withMessage('ID不能为空'),
  param('id').isInt().withMessage('ID必须是整数'),
  param('id').custom(checkArticleExists),
]);

// 更新文章验证
exports.updateArticleValidate = validate([
  param('id').notEmpty().withMessage('ID不能为空'),
  param('id').isInt().withMessage('ID必须是整数'),
  param('id').custom(checkArticleExists),
  body('title').notEmpty().withMessage('标题不能为空'),
  body('content').notEmpty().withMessage('内容不能为空'),
]);
