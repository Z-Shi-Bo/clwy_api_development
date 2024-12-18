const { body } = require('express-validator');
const { validate } = require('../validator');

// 点赞验证
exports.likeValidate = validate([
  body('courseId').notEmpty().withMessage('课程ID不能为空'),
]);
