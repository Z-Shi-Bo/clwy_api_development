// 模糊搜索
const { Op } = require('sequelize');
// 引入服务
const {
  getUserList,
  getUserDetail,
  createUser,
  updateUser,
} = require('../../service/admin/userService');
const { passwordEncrypt } = require('../../utils/passwordEncrypt');

// 获取用户列表
exports.getUserList = async (req, res) => {
  try {
    const {
      page = 1,
      pageSize = 10,
      email = '',
      username = '',
      nickname = '',
      role = '',
      sex = '',
      sort = 'id',
      order = 'asc',
    } = req.query;
    const params = {
      offset: Math.abs((page - 1) * pageSize),
      limit: Math.abs(pageSize),
      order: [[sort, order]],
      where: {
        email: { [Op.like]: `%${email}%` },
        username: { [Op.like]: `%${username}%` },
        nickname: { [Op.like]: `%${nickname}%` },
        status: { [Op.eq]: 1 },
        ...(role && { role: { [Op.eq]: role } }),
        ...(sex && { sex: { [Op.eq]: sex } }),
      },
    };
    const { data, pagination } = await getUserList(params, page, pageSize);
    res.success({ data, pagination }, '获取用户列表成功');
  } catch (error) {
    console.log(error);
    res.error('获取用户列表失败');
  }
};

// 获取用户详情
exports.getUserDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getUserDetail(id);
    if (!data) {
      return res.error('用户不存在', 404);
    }
    res.success({ data }, '获取用户详情成功');
  } catch (error) {
    console.log(error);
    res.error('获取用户详情失败');
  }
};

// 创建用户
exports.createUser = async (req, res) => {
  try {
    const params = await filterBody(req);
    console.log(params);
    const data = await createUser(params);
    res.success({ data }, '创建用户成功', 201);
  } catch (error) {
    console.log(error);
    res.error('创建用户失败');
  }
};

// 更新用户
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const params = await filterBody(req);
    const data = await updateUser(id, params);
    res.success({ data }, '更新用户成功');
  } catch (error) {
    console.log(error);
    res.error('更新用户失败');
  }
};

// 删除用户 0: 禁用, 1: 正常
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await updateUser(id, { status: 0 });
    res.success({ data }, '删除用户成功');
  } catch (error) {
    console.log(error);
    res.error('删除用户失败');
  }
};

// 参数白名单过滤
async function filterBody(req) {
  const {
    email,
    username,
    nickname,
    role,
    sex,
    password,
    avatar,
    company,
    introduce,
  } = req.body;
  return {
    email,
    username,
    nickname,
    role,
    sex,
    password: await passwordEncrypt(password),
    avatar,
    company,
    introduce,
  };
}
