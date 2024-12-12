const { body, param } = require('express-validator');
const { validate } = require('./index');
const { Category } = require('../models');

// 统一判断分类是否存在
const checkCategoryExists = async (value) => {
  const category = await Category.findByPk(value);
  if (!category) {
    return Promise.reject('分类不存在');
  }
};

// 创建分类验证 先判断分类是否存在
exports.createCategoryValidate = validate([
  body('name').notEmpty().withMessage('名称不能为空'),
  body('rank').notEmpty().withMessage('排序不能为空'),
  body('name').custom(checkCategoryExists),
]);

// 删除分类验证和获取分类详情验证
exports.deleteAndGetDetailValidate = validate([
  param('id').notEmpty().withMessage('ID不能为空'),
  param('id').isInt().withMessage('ID必须是整数'),
  param('id').custom(checkCategoryExists),
]);

// 更新分类验证
exports.updateCategoryValidate = validate([
  param('id').notEmpty().withMessage('ID不能为空'),
  param('id').isInt().withMessage('ID必须是整数'),
  param('id').custom(checkCategoryExists),
  body('name').notEmpty().withMessage('名称不能为空'),
  body('rank').notEmpty().withMessage('排序不能为空'),
]);
