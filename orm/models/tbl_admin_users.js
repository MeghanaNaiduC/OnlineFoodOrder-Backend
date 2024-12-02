/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbl_admin_users', {
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
    code: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    state: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    country: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    zip: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    courseId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    password_reset_token: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    is_verified: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '1'
    },
    otp: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    is_deleted: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
  }, {
    tableName: 'tbl_admin_users',
    timestamps: false
  });
};
