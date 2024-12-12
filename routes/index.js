const express = require('express');
const router = express.Router();

// 文章接口
router.use('/admin/articles', require('./admin/articleRoute'));

module.exports = router;
