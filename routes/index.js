const express = require('express');
const router = express.Router();

// 文章接口
router.use('/admin/articles', require('./admin/articleRoute'));

// 分类接口
router.use('/admin/categories', require('./admin/categoryRoute'));

// 设置接口
router.use('/admin/settings', require('./admin/settingRoute'));

module.exports = router;
