/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbl_drivers', {
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
    courseId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    oneSignalId: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'tbl_drivers',
    timestamps: false
  });
};
