// 模糊搜索
const { Op } = require('sequelize');
// 引入服务
const {
  getSettingDetail,
  updateSetting,
} = require('../../service/admin/settingService');

// 获取设置详情
exports.getSettingDetail = async (req, res) => {
  try {
    const data = await getSettingDetail();
    res.success({ data }, '获取设置详情成功');
  } catch (error) {
    console.log(error);
    res.error('获取设置详情失败');
  }
};

// 更新设置
exports.updateSetting = async (req, res) => {
  try {
    const { name, icp, copyright } = req.body;
    const data = await updateSetting({ name, icp, copyright });
    res.success({ data }, '更新设置成功');
  } catch (error) {
    console.log(error);
    res.error('更新设置失败');
  }
};
