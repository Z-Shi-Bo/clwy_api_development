const express = require('express');
const router = express.Router();
const {
  getSexCount,
  getUserCount,
} = require('../../controller/admin/chartController');

/**
 * 获取用户性别数量
 * /api/v1/charts/sex
 */
router.get('/sex', getSexCount);

/**
 * 用户数量统计
 * /api/v1/charts/userCount
 */
router.get('/userCount', getUserCount);

module.exports = router;
