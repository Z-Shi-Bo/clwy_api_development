const express = require('express');
const router = express.Router();
const {
  getUserList,
  getUserDetail,
  createUser,
  updateUser,
  deleteUser,
} = require('../../controller/admin/userController');
const {
  createUserValidate,
  updateUserValidate,
  deleteAndGetDetailValidate,
} = require('../../validator/userValidate');

/**
 * 获取用户列表-支持模糊搜索
 * /api/v1/users
 */
router.get('/', getUserList);

/**
 * 获取用户详情
 * /api/v1/users/:id
 */
router.get('/:id', deleteAndGetDetailValidate, getUserDetail);

/**
 * 创建用户
 * /api/v1/users
 */
router.post('/', createUserValidate, createUser);

/**
 * 更新用户
 * /api/v1/users/:id
 */
router.put('/:id', updateUserValidate, updateUser);

/**
 * 删除用户
 * /api/v1/users/:id
 */
router.delete('/:id', deleteAndGetDetailValidate, deleteUser);

module.exports = router;
