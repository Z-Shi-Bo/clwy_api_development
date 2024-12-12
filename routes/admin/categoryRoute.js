const express = require('express');
const router = express.Router();
const {
  getCategoryList,
  getCategoryDetail,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../../controller/admin/categoryController');
const {
  createCategoryValidate,
  updateCategoryValidate,
  deleteAndGetDetailValidate,
} = require('../../validator/categoryValidate');

/**
 * 获取分类列表-支持模糊搜索
 * /api/v1/categories
 */
router.get('/', getCategoryList);

/**
 * 获取分类详情
 * /api/v1/categories/:id
 */
router.get('/:id', deleteAndGetDetailValidate, getCategoryDetail);

/**
 * 创建分类
 * /api/v1/categories
 */
router.post('/', createCategoryValidate, createCategory);

/**
 * 更新分类
 * /api/v1/categories/:id
 */
router.put('/:id', updateCategoryValidate, updateCategory);

/**
 * 删除分类
 * /api/v1/categories/:id
 */
router.delete('/:id', deleteAndGetDetailValidate, deleteCategory);

module.exports = router;
