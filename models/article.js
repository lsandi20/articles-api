'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Article.belongsTo(models.ArticleCategory, {
        foreignKey: 'category_id'
      })
    }
  }
  Article.init({
    title: DataTypes.STRING,
    short_description: DataTypes.STRING,
    description: DataTypes.TEXT,
    category_id: DataTypes.UUID,
    is_visible: DataTypes.BOOLEAN,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};