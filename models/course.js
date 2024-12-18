'use strict';
const { Model } = require('sequelize');
const moment = require('moment');
moment.locale('zh-cn');

module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Course.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        as: 'category',
      });
      models.Course.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
      models.Course.hasMany(models.Chapter, {
        foreignKey: 'courseId',
        as: 'chapters',
      });
      models.Course.belongsToMany(models.User, {
        through: models.Like,
        foreignKey: 'courseId',
        as: 'likeUsers',
      });
    }
  }
  Course.init(
    {
      categoryId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      recommended: DataTypes.BOOLEAN,
      introductory: DataTypes.BOOLEAN,
      content: DataTypes.TEXT,
      likesCount: DataTypes.INTEGER,
      chaptersCount: DataTypes.INTEGER,
      createdAt: {
        type: DataTypes.DATE,
        get() {
          return moment(this.getDataValue('createdAt')).format(
            'YYYY-MM-DD HH:mm:ss'
          );
        },
      },
      updatedAt: {
        type: DataTypes.DATE,
        get() {
          return moment(this.getDataValue('updatedAt')).format(
            'YYYY-MM-DD HH:mm:ss'
          );
        },
      },
    },
    {
      sequelize,
      modelName: 'Course',
    }
  );
  return Course;
};
