/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('tbl_locations', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      latitude: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      longitude: {
        type: DataTypes.DOUBLE,
        allowNull: false
      }
    }, {
      tableName: 'tbl_locations',
      timestamps:false
    });
  };
  