'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'admin@clwy.cn',
          username: 'admin',
          password: '123456',
          nickname: '管理员',
          sex: 2,
          role: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'libai@clwy.cn',
          username: 'libai',
          password: '123456',
          nickname: '李白',
          sex: 0,
          role: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'dufu@clwy.cn',
          username: 'dufu',
          password: '123456',
          nickname: '杜甫',
          sex: 0,
          role: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'baijuyi@clwy.cn',
          username: 'baijuyi',
          password: '123456',
          nickname: '白居易',
          sex: 1,
          role: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
