const express = require('express');
const router = express.Router();

// 文章接口
router.use('/admin/articles', require('./admin/articleRoute'));

// 分类接口
router.use('/admin/categories', require('./admin/categoryRoute'));

// 设置接口
router.use('/admin/settings', require('./admin/settingRoute'));

// 用户接口
router.use('/admin/users', require('./admin/userRoute'));

// 课程接口
router.use('/admin/courses', require('./admin/courseRoute'));

// 章节接口
router.use('/admin/chapters', require('./admin/chapterRoute'));

// 图表接口
router.use('/admin/charts', require('./admin/chartRoute'));

module.exports = router;
