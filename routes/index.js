const express = require('express');
const router = express.Router();
const { adminAuth } = require('../middleware/auth');

// 文章接口
router.use('/admin/articles', adminAuth(), require('./admin/articleRoute'));

// 分类接口
router.use('/admin/categories', adminAuth(), require('./admin/categoryRoute'));

// 设置接口
router.use('/admin/settings', adminAuth(), require('./admin/settingRoute'));

// 用户接口
router.use('/admin/users', adminAuth(), require('./admin/userRoute'));

// 课程接口
router.use('/admin/courses', adminAuth(), require('./admin/courseRoute'));

// 章节接口
router.use('/admin/chapters', adminAuth(), require('./admin/chapterRoute'));

// 图表接口
router.use('/admin/charts', adminAuth(), require('./admin/chartRoute'));

// 登录接口
router.use('/admin/auth', require('./admin/authRoute'));

// 前台接口
router.use('/front', adminAuth(), require('./front/index'));

module.exports = router;
