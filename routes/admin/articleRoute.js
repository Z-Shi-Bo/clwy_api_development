const express = require('express');
const router = express.Router();
const {
  getArticleList,
  getArticleDetail,
  createArticle,
  updateArticle,
  deleteArticle,
} = require('../../controller/admin/articleController');

/**
 * 获取文章列表
 * /api/v1/articles
 */
router.get('/', getArticleList);

/**
 * 获取文章详情
 * /api/v1/articles/:id
 */
router.get('/:id', getArticleDetail);

/**
 * 创建文章
 * /api/v1/articles
 */
router.post('/', createArticle);

/**
 * 更新文章
 * /api/v1/articles/:id
 */
router.put('/:id', updateArticle);

/**
 * 删除文章
 * /api/v1/articles/:id
 */
router.delete('/:id', deleteArticle);

module.exports = router;
