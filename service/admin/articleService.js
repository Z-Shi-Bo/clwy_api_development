const { Article } = require('../../models');

// 获取文章列表
exports.getArticleList = async (params, page, pageSize) => {
  const { count, rows } = await Article.findAndCountAll(params);
  return {
    data: rows,
    pagination: {
      total: count,
      page,
      pageSize,
    },
  };
};

// 获取文章详情
exports.getArticleDetail = async (id) => {
  const data = await Article.findByPk(id);
  return data;
};

// 创建文章
exports.createArticle = async (data) => {
  const article = await Article.create(data);
  return article;
};

// 更新文章
exports.updateArticle = async (id, data) => {
  const [affectedCount] = await Article.update(data, { where: { id } });
  return affectedCount;
};

// 删除文章
exports.deleteArticle = async (id) => {
  const article = await Article.destroy({ where: { id } });
  return article;
};
