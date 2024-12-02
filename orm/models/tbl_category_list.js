/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbl_category_list', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    category_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    menuSectionId: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    tableName: 'tbl_category_list',
    timestamps: false
  });
};
