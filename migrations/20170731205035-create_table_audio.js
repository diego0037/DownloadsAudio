'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('audios',
   {
     id: {
       type: Sequelize.INTEGER,
       primaryKey: true,
       autoIncrement: true,
       allowNull: false
     },
     estado: {
       type: Sequelize.STRING,
       allowNull: false
     },
     createdAt: {
       type: Sequelize.DATE
     },
     updatedAt: {
       type: Sequelize.DATE
     },
 });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('audios');
  }
};
