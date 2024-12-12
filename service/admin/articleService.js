const { Article } = require('../../models');

// 不需要返回的数据
const articleAttributes = [];

// 获取文章列表
exports.getArticleList = async (page = 1, pageSize = 10) => {
  const data = await Article.findAll({
    offset: (page - 1) * pageSize,
    limit: pageSize,
    order: [['id', 'asc']],
  });
  return data;
};

// 获取文章详情
exports.getArticleDetail = async (id) => {
  const data = await Article.findByPk(id);
  console.log(data);
  return data;
};

// 创建文章
exports.createArticle = async (data) => {
  const article = await Article.create(data);
  return article;
};

// 更新文章
exports.updateArticle = async (id, data) => {
  const article = await Article.update(data, { where: { id } });
  return article;
};

// 删除文章
exports.deleteArticle = async (id) => {
  const article = await Article.destroy({ where: { id } });
  return article;
};
