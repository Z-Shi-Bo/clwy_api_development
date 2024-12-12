const express = require('express');
const router = express.Router();
const {
  getSettingDetail,
  updateSetting,
} = require('../../controller/admin/settingController');
const { updateSettingValidate } = require('../../validator/settingValidate');

/**
 * 获取设置详情
 * /api/v1/settings
 */
router.get('/', getSettingDetail);

/**
 * 更新设置
 * /api/v1/settings
 */
router.put('/', updateSettingValidate, updateSetting);

module.exports = router;
