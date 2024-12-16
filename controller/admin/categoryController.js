// 模糊搜索
const { Op } = require('sequelize');
// 引入服务
const {
  getCategoryList,
  getCategoryDetail,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../../service/admin/categoryService');
const { Course } = require('../../models');

// 获取分类列表
exports.getCategoryList = async (req, res) => {
  try {
    const {
      page = 1,
      pageSize = 10,
      name = '',
      rank = '',
      sort = 'id',
      order = 'asc',
    } = req.query;
    const params = {
      offset: Math.abs((page - 1) * pageSize),
      limit: Math.abs(pageSize),
      ...getCondition(),
      order: [[sort, order]],
      where: {
        name: { [Op.like]: `%${name}%` },
        rank: { [Op.like]: `%${rank}%` },
      },
    };
    const { data, pagination } = await getCategoryList(params, page, pageSize);
    res.success({ data, pagination }, '获取分类列表成功');
  } catch (error) {
    console.error('获取分类列表失败:', error);
    res.error('获取分类列表失败');
  }
};

// 获取分类详情
exports.getCategoryDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getCategoryDetail(id, getCondition());
    if (!data) {
      return res.error('分类不存在', 404);
    }
    res.success({ data }, '获取分类详情成功');
  } catch (error) {
    console.error('获取分类详情失败:', error);
    res.error('获取分类详情失败');
  }
};

// 创建分类
exports.createCategory = async (req, res) => {
  try {
    const { name, rank } = req.body;
    const data = await createCategory({ name, rank });
    res.success({ data }, '创建分类成功', 201);
  } catch (error) {
    console.error('创建分类失败:', error);
    res.error('创建分类失败');
  }
};

// 更新分类
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, rank } = req.body;
    // 判断分类是否存在
    const category = await getCategoryDetail(id);
    if (!category) {
      return res.error('分类不存在', 404);
    }
    const data = await updateCategory(id, { name, rank });
    res.success({ data }, '更新分类成功');
  } catch (error) {
    console.error('更新分类失败:', error);
    res.error('更新分类失败');
  }
};

// 删除分类
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    // 判断分类是否存在
    const category = await getCategoryDetail(id);
    if (!category) {
      return res.error('分类不存在', 404);
    }
    // 判断分类下是否有课程
    const courses = await Course.findAll({ where: { categoryId: id } });
    if (courses.length > 0) {
      return res.error('分类下有课程，无法删除', 400);
    }
    const data = await deleteCategory(id);
    res.success({ data }, '删除分类成功');
  } catch (error) {
    console.error('删除分类失败:', error);
    res.error('删除分类失败');
  }
};

// 获取参数
function getCondition() {
  return {
    include: [
      {
        model: Course,
        as: 'courses',
      },
    ],
  };
}
