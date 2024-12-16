const { Chapter } = require('../../models');

// 获取章节列表
exports.getChapterList = async (params, page, pageSize) => {
  const { count, rows } = await Chapter.findAndCountAll(params);
  return {
    data: rows,
    pagination: {
      total: count,
      page,
      pageSize,
    },
  };
};

// 获取章节详情
exports.getChapterDetail = async (id, condition) => {
  const data = await Chapter.findByPk(id, condition);
  return data;
};

// 创建章节
exports.createChapter = async (data) => {
  const chapter = await Chapter.create(data);
  return chapter;
};

// 更新章节
exports.updateChapter = async (id, data) => {
  const [affectedCount] = await Chapter.update(data, { where: { id } });
  return affectedCount;
};

// 删除章节
exports.deleteChapter = async (id) => {
  const chapter = await Chapter.destroy({ where: { id } });
  return chapter;
};
