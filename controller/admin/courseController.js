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
const { User, Category, Chapter } = require('../../models');

// 获取课程列表
exports.getCourseList = async (req, res) => {
  try {
    const {
      page = 1,
      pageSize = 10,
      categoryId = '',
      userId = '',
      name = '',
      recommended = '',
      introductory = '',
      sort = 'id',
      order = 'asc',
    } = req.query;
    const whereConditions = {
      ...(categoryId && { categoryId: { [Op.eq]: categoryId } }),
      ...(userId && { userId: { [Op.eq]: userId } }),
      ...(name && { name: { [Op.like]: `%${name}%` } }),
      ...(recommended && { recommended: { [Op.eq]: recommended === 'true' } }),
      ...(introductory && {
        introductory: { [Op.eq]: introductory === 'true' },
      }),
    };
    const params = {
      offset: Math.abs((page - 1) * pageSize),
      limit: Math.abs(pageSize),
      ...getCondition(),
      order: [[sort, order]],
      where: whereConditions,
    };
    const { data, pagination } = await getCourseList(params, page, pageSize);
    res.success({ data, pagination }, '获取课程列表成功');
  } catch (error) {
    console.error('获取课程列表失败:', error);
    res.error('获取课程列表失败');
  }
};

// 获取课程详情
exports.getCourseDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getCourseDetail(id, getCondition());
    if (!data) {
      return res.error('课程不存在', 404);
    }
    res.success({ data }, '获取课程详情成功');
  } catch (error) {
    console.error('获取课程详情失败:', error);
    res.error('获取课程详情失败');
  }
};

// 创建课程
exports.createCourse = async (req, res) => {
  try {
    const data = await createCourse({
      ...getBody(req),
      userId: req.user.id,
    });
    res.success({ data }, '创建课程成功', 201);
  } catch (error) {
    console.error('创建课程失败:', error);
    res.error('创建课程失败');
  }
};

// 更新课程
exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await updateCourse(id, {
      ...getBody(req),
      userId: req.user.id,
    });
    res.success({ data }, '更新课程成功');
  } catch (error) {
    console.error('更新课程失败:', error);
    res.error('更新课程失败');
  }
};

// 删除课程
exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    // 删除课程时判断是否有关联的章节
    const chapter = await Chapter.findOne({ where: { courseId: id } });
    if (chapter) {
      return res.error('课程有关联的章节，不能删除', 400);
    }
    const data = await deleteCourse(id);
    res.success({ data }, '删除课程成功');
  } catch (error) {
    console.error('删除课程失败:', error);
    res.error('删除课程失败');
  }
};

// 获取条件
function getCondition() {
  return {
    attributes: {
      exclude: ['userId', 'categoryId'],
    },
    include: [
      {
        model: Category,
        attributes: ['id', 'name'],
        as: 'category',
      },
      {
        model: User,
        attributes: ['id', 'username', 'avatar'],
        as: 'user',
      },
    ],
  };
}

// 参数过滤
function getBody(req) {
  const { categoryId, name, recommended, introductory } = req.body;
  return {
    categoryId,
    name,
    recommended,
    introductory,
  };
}
