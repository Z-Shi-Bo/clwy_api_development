// 前台路由
const express = require('express');
const router = express.Router();
const {
  recommendedCourses,
  popularCourses,
  beginnerCourses,
  categories,
  courses,
  courseDetail,
  like,
  getLikeCourses,
  getLikeUsers,
} = require('../../controller/front/frontController');
const { likeValidate } = require('../../validator/frontValidate');

// 推荐课程
router.get('/recommended-courses', recommendedCourses);

// 人气课程
router.get('/popular-courses', popularCourses);

// 入门课程
router.get('/beginner-courses', beginnerCourses);

// 分类接口
router.get('/categories', categories);

// 课程接口
router.get('/courses', courses);

// 课程详情接口
router.get('/courses/:id', courseDetail);

// 点赞、取消赞
router.post('/likes', likeValidate, like);

// 获取用户点赞的课程
router.get('/likes', getLikeCourses);

// 获取课程点赞的用户
router.get('/like-users', getLikeUsers);

module.exports = router;
