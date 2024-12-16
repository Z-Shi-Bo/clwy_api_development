const { Category } = require('../../models');

// 获取分类列表
exports.getCategoryList = async (params, page, pageSize) => {
  try {
    const { count, rows } = await Category.findAndCountAll(params);
    return {
      data: rows,
      pagination: {
        total: count,
        page,
        pageSize,
      },
    };
  } catch (error) {
    throw new Error('获取分类列表失败');
  }
};

// 获取分类详情
exports.getCategoryDetail = async (id, condition) => {
  try {
    const data = await Category.findByPk(id, condition);
    if (!data) {
      throw new Error('分类不存在');
    }
    return data;
  } catch (error) {
    throw new Error('获取分类详情失败');
  }
};

// 创建分类
exports.createCategory = async (data) => {
  try {
    const category = await Category.create(data);
    return category;
  } catch (error) {
    throw new Error('创建分类失败');
  }
};

// 更新分类
exports.updateCategory = async (id, data) => {
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      throw new Error('分类不存在');
    }
    const [affectedCount] = await Category.update(data, { where: { id } });
    return affectedCount;
  } catch (error) {
    throw new Error('更新分类失败');
  }
};

// 删除分类
exports.deleteCategory = async (id) => {
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      throw new Error('分类不存在');
    }
    const result = await Category.destroy({ where: { id } });
    return result;
  } catch (error) {
    throw new Error('删除分类失败');
  }
};
