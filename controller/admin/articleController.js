// 引入服务
const {
  getArticleList,
  getArticleDetail,
  createArticle,
  updateArticle,
  deleteArticle,
} = require('../../service/admin/articleService');

// 获取文章列表
exports.getArticleList = async (req, res) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;
    const data = await getArticleList(page, pageSize);
    res.success(data, '获取文章列表成功');
  } catch (error) {
    res.error('获取文章列表失败');
  }
};

// 获取文章详情
exports.getArticleDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getArticleDetail(id);
    if (!data) {
      return res.error('文章不存在', 404);
    }
    res.success(data, '获取文章详情成功');
  } catch (error) {
    res.error('获取文章详情失败');
  }
};

// 创建文章
exports.createArticle = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.error('标题和内容不能为空');
    }
    const data = await createArticle({ title, content });
    res.success(data, '创建文章成功', 201);
  } catch (error) {
    res.error('创建文章失败');
  }
};

// 更新文章
exports.updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    if (!title || !content) {
      return res.error('标题和内容不能为空');
    }
    // 判断文章是否存在
    const article = await getArticleDetail(id);
    if (!article) {
      return res.error('文章不存在', 404);
    }
    const data = await updateArticle(id, { title, content });
    res.success(...data, '更新文章成功');
  } catch (error) {
    res.error('更新文章失败');
  }
};

// 删除文章
exports.deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    // 判断文章是否存在
    const article = await getArticleDetail(id);
    if (!article) {
      return res.error('文章不存在', 404);
    }
    const data = await deleteArticle(id);
    res.success(data, '删除文章成功');
  } catch (error) {
    res.error('删除文章失败');
  }
};
