/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbl_super_admin', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    otp: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    is_verified: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '1'
    }
  }, {
    tableName: 'tbl_super_admin',
    timestamps : false
  });
};
