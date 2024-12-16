'use strict';
const { Model } = require('sequelize');
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
    },
    {
      sequelize,
      modelName: 'Course',
    }
  );
  return Course;
};
