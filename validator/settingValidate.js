const { body, param } = require('express-validator');
const { validate } = require('./index');

// 更新设置验证
exports.updateSettingValidate = validate([
  body('name').notEmpty().withMessage('名称不能为空'),
  body('icp').notEmpty().withMessage('ICP不能为空'),
  body('copyright').notEmpty().withMessage('版权不能为空'),
]);
