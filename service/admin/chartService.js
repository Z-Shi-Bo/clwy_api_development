const { User, sequelize } = require('../../models');

// 获取用户性别数量
exports.getSexCount = async (sex) => {
  try {
    const count = await User.count({ where: { sex } });
    return count;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 用户数量统计
exports.getUserCount = async () => {
  try {
    const count = await sequelize.query(
      'SELECT DATE_FORMAT(`createdAt`, "%Y-%m") AS `month`, COUNT(*) AS `value` FROM `Users` GROUP BY `month` ORDER BY `month` ASC'
    );
    return count;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
