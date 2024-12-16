const { User } = require('../../models');

// 获取用户列表
exports.getUserList = async (params, page, pageSize) => {
  const { count, rows } = await User.findAndCountAll({
    ...params,
    attributes: { exclude: ['password'] },
  });
  return {
    data: rows,
    pagination: {
      total: count,
      page,
      pageSize,
    },
  };
};

// 获取用户详情
exports.getUserDetail = async (id) => {
  const data = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
  });
  return data;
};

// 创建用户
exports.createUser = async (data) => {
  const user = await User.create(data);
  return user;
};

// 更新用户 0: 禁用, 1: 正常  变相删除
exports.updateUser = async (id, data) => {
  const [affectedCount] = await User.update(data, { where: { id } });
  return affectedCount;
};
