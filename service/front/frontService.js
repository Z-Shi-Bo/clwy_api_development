const { Course, Category, Like } = require('../../models');

// 获取推荐课程
exports.getRecommendedCourses = async (params) => {
  const data = await Course.findAll(params);
  return data;
};

// 获取人气课程
exports.getPopularCourses = async (params) => {
  const data = await Course.findAll(params);
  return data;
};

// 获取入门课程
exports.getBeginnerCourses = async (params) => {
  const data = await Course.findAll(params);
  return data;
};

// 获取分类
exports.getCategories = async (params) => {
  const data = await Category.findAll(params);
  return data;
};

// 获取课程
exports.getCourses = async (params) => {
  const { count, rows } = await Course.findAndCountAll(params);
  return { count, rows };
};

// 获取课程详情
exports.getCourseDetail = async (id, params) => {
  const data = await Course.findByPk(id, params);
  return data;
};

// 点赞、取消赞
exports.likeCourse = async (params) => {
  const data = await Like.findOne({
    where: params,
  });
  return data;
};

// 创建点赞
exports.createLike = async (params) => {
  const data = await Like.create(params);
  return data;
};

// 获取课程点赞的用户
exports.getLikeUsers = async (courseId, params) => {
  const data = await Course.findByPk(courseId, params);
  return data;
};
