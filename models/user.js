'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Course, {
        foreignKey: 'userId',
        as: 'courses',
      });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      nickname: DataTypes.STRING,
      sex: DataTypes.TINYINT, // 0: 男, 1: 女, 2: 未知
      company: DataTypes.STRING,
      introduce: DataTypes.TEXT,
      role: DataTypes.TINYINT, // 0: 普通用户, 100: 管理员
      avatar: DataTypes.STRING,
      status: DataTypes.TINYINT, // 0: 禁用, 1: 正常
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
