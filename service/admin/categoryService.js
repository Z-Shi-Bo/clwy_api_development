const { Category } = require('../../models');

// 获取分类列表
exports.getCategoryList = async (params, page, pageSize) => {
  const { count, rows } = await Category.findAndCountAll(params);
  return {
    data: rows,
    pagination: {
      total: count,
      page,
      pageSize,
    },
  };
};

// 获取分类详情
exports.getCategoryDetail = async (id) => {
  const data = await Category.findByPk(id);
  return data;
};

// 创建分类
exports.createCategory = async (data) => {
  const category = await Category.create(data);
  return category;
};

// 更新分类
exports.updateCategory = async (id, data) => {
  const [affectedCount] = await Category.update(data, { where: { id } });
  return affectedCount;
};

// 删除分类
exports.deleteCategory = async (id) => {
  const category = await Category.destroy({ where: { id } });
  return category;
};
