/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbl_provinces', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    province: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'tbl_provinces',
    timestamps:false
  });
};
