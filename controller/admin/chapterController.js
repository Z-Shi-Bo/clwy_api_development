// 模糊搜索
const { Op } = require('sequelize');
// 引入服务
const {
  getChapterList,
  getChapterDetail,
  createChapter,
  updateChapter,
  deleteChapter,
} = require('../../service/admin/chapterService');
const { Course } = require('../../models');

// 获取章节列表
exports.getChapterList = async (req, res) => {
  try {
    const {
      page = 1,
      pageSize = 10,
      courseId = '',
      title = '',
      content = '',
      sort = 'id',
      order = 'asc',
    } = req.query;
    const whereConditions = {
      ...(courseId && { courseId: { [Op.eq]: courseId } }),
      ...(title && { title: { [Op.like]: `%${title}%` } }),
      ...(content && { content: { [Op.like]: `%${content}%` } }),
    };
    const params = {
      offset: Math.abs((page - 1) * pageSize),
      limit: Math.abs(pageSize),
      ...getCondition(),
      order: [
        [sort, order],
        ['rank', 'asc'],
      ],
      where: whereConditions,
    };
    const { data, pagination } = await getChapterList(params, page, pageSize);
    res.success({ data, pagination }, '获取章节列表成功');
  } catch (error) {
    console.error('获取章节列表失败:', error);
    res.error('获取章节列表失败');
  }
};

// 获取章节详情
exports.getChapterDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getChapterDetail(id, getCondition());
    if (!data) {
      return res.error('章节不存在', 404);
    }
    res.success({ data }, '获取章节详情成功');
  } catch (error) {
    console.error('获取章节详情失败:', error);
    res.error('获取章节详情失败');
  }
};

// 创建章节
exports.createChapter = async (req, res) => {
  try {
    const data = await createChapter(getBody(req));
    res.success({ data }, '创建章节成功', 201);
  } catch (error) {
    console.error('创建章节失败:', error);
    res.error('创建章节失败');
  }
};

// 更新章节
exports.updateChapter = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await updateChapter(id, getBody(req));
    res.success({ data }, '更新章节成功');
  } catch (error) {
    console.error('更新章节失败:', error);
    res.error('更新章节失败');
  }
};

// 删除章节
exports.deleteChapter = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await deleteChapter(id);
    res.success({ data }, '删除章节成功');
  } catch (error) {
    console.error('删除章节失败:', error);
    res.error('删除章节失败');
  }
};

// 获取条件
function getCondition() {
  return {
    attributes: {
      exclude: ['courseId'],
    },
    include: [
      {
        model: Course,
        attributes: ['id', 'name'],
        as: 'course',
      },
    ],
  };
}

// 参数过滤
function getBody(req) {
  const { courseId, title, content, video = '', rank = '' } = req.body;
  return {
    courseId,
    title,
    content,
    video,
    rank,
  };
}
