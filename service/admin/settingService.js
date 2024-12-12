const { Setting } = require('../../models');

// 获取设置详情
exports.getSettingDetail = async () => {
  const data = await Setting.findByPk(1);
  return data;
};

// 更新设置
exports.updateSetting = async (data) => {
  const [affectedCount] = await Setting.update(data, { where: { id: 1 } });
  return affectedCount;
};
