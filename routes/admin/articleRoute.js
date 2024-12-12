const express = require('express');
const router = express.Router();
const {
  getArticleList,
  getArticleDetail,
  createArticle,
  updateArticle,
  deleteArticle,
} = require('../../controller/admin/articleController');
const {
  createArticleValidate,
  updateArticleValidate,
  deleteAndGetDetailValidate,
} = require('../../validator/articleValidate');

/**
 * 获取文章列表-支持模糊搜索
 * /api/v1/articles
 */
router.get('/', getArticleList);

/**
 * 获取文章详情
 * /api/v1/articles/:id
 */
router.get('/:id', deleteAndGetDetailValidate, getArticleDetail);

/**
 * 创建文章
 * /api/v1/articles
 */
router.post('/', createArticleValidate, createArticle);

/**
 * 更新文章
 * /api/v1/articles/:id
 */
router.put('/:id', updateArticleValidate, updateArticle);

/**
 * 删除文章
 * /api/v1/articles/:id
 */
router.delete('/:id', deleteAndGetDetailValidate, deleteArticle);

module.exports = router;
