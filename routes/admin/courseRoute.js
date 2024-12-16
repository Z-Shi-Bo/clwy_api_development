const express = require('express');
const router = express.Router();
const {
  getCourseList,
  getCourseDetail,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../../controller/admin/courseController');
const {
  createCourseValidate,
  updateCourseValidate,
  deleteAndGetDetailValidate,
} = require('../../validator/courseValidate');

/**
 * 获取课程列表-支持模糊搜索
 * /api/v1/courses
 */
router.get('/', getCourseList);

/**
 * 获取课程详情
 * /api/v1/courses/:id
 */
router.get('/:id', deleteAndGetDetailValidate, getCourseDetail);

/**
 * 创建课程
 * /api/v1/courses
 */
router.post('/', createCourseValidate, createCourse);

/**
 * 更新课程
 * /api/v1/courses/:id
 */
router.put('/:id', updateCourseValidate, updateCourse);

/**
 * 删除课程
 * /api/v1/courses/:id
 */
router.delete('/:id', deleteAndGetDetailValidate, deleteCourse);

module.exports = router;
