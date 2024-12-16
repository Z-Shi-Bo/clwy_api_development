// 模糊搜索
const { Op } = require('sequelize');
// 引入服务
const {
  getCourseList,
  getCourseDetail,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../../service/admin/courseService');

// 获取课程列表
exports.getCourseList = async (req, res) => {
  try {
    const {
      page = 1,
      pageSize = 10,
      title = '',
      content = '',
      sort = 'id',
      order = 'asc',
    } = req.query;
    const params = {
      offset: Math.abs((page - 1) * pageSize),
      limit: Math.abs(pageSize),
      order: [[sort, order]],
      where: {
        title: { [Op.like]: `%${title}%` },
        content: { [Op.like]: `%${content}%` },
      },
    };
    const { data, pagination } = await getCourseList(params, page, pageSize);
    res.success({ data, pagination }, '获取课程列表成功');
  } catch (error) {
    console.log(error);
    res.error('获取课程列表失败');
  }
};

// 获取课程详情
exports.getCourseDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getCourseDetail(id);
    if (!data) {
      return res.error('课程不存在', 404);
    }
    res.success({ data }, '获取课程详情成功');
  } catch (error) {
    console.log(error);
    res.error('获取课程详情失败');
  }
};

// 创建课程
exports.createCourse = async (req, res) => {
  try {
    const { title, content } = req.body;
    const data = await createCourse({ title, content });
    res.success({ data }, '创建课程成功', 201);
  } catch (error) {
    console.log(error);
    res.error('创建课程失败');
  }
};

// 更新课程
exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const data = await updateCourse(id, { title, content });
    res.success({ data }, '更新课程成功');
  } catch (error) {
    console.log(error);
    res.error('更新课程失败');
  }
};

// 删除课程
exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await deleteCourse(id);
    res.success({ data }, '删除课程成功');
  } catch (error) {
    console.log(error);
    res.error('删除课程失败');
  }
};
