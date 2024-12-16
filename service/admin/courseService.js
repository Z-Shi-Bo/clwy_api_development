const { Course } = require('../../models');

// 获取课程列表
exports.getCourseList = async (params, page, pageSize) => {
  const { count, rows } = await Course.findAndCountAll(params);
  return {
    data: rows,
    pagination: {
      total: count,
      page,
      pageSize,
    },
  };
};

// 获取课程详情
exports.getCourseDetail = async (id, condition) => {
  const data = await Course.findByPk(id, condition);
  return data;
};

// 创建课程
exports.createCourse = async (data) => {
  const course = await Course.create(data);
  return course;
};

// 更新课程
exports.updateCourse = async (id, data) => {
  const [affectedCount] = await Course.update(data, { where: { id } });
  return affectedCount;
};

// 删除课程
exports.deleteCourse = async (id) => {
  const course = await Course.destroy({ where: { id } });
  return course;
};
