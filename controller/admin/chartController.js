// 引入服务
const {
  getSexCount,
  getUserCount,
} = require('../../service/admin/chartService');

// 获取用户性别数量
exports.getSexCount = async (req, res) => {
  try {
    const maleCount = await getSexCount(0);
    const femaleCount = await getSexCount(1);
    const unknownCount = await getSexCount(2);
    const data = [
      { name: '男', value: maleCount },
      { name: '女', value: femaleCount },
      { name: '未知', value: unknownCount },
    ];
    res.success({ data }, '获取用户性别数量成功');
  } catch (error) {
    console.log(error);
    res.error('获取用户性别数量失败');
  }
};

// 用户数量统计
exports.getUserCount = async (req, res) => {
  try {
    const [data] = await getUserCount();
    res.success({ data }, '获取用户数量统计成功');
  } catch (error) {
    console.log(error);
    res.error('获取用户数量统计失败');
  }
};
