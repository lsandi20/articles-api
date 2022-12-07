'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Articles', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      short_description: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      category_id: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'ArticleCategories',
            schema: 'public'
          },
          key: 'id',
          as: 'category_id'
        },
        allowNull: false
      },
      is_visible: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      image: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Articles');
  }
};