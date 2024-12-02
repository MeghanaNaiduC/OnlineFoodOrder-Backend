/* jshint indent: 2 */
const functions = require('../../lib/functions');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbl_settings', {
    settings_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    setting_type: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: '1'
    },
    modified_date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'tbl_settings',
    updatedAt: 'modified_date',
    createdAt: 'modified_date',
    hooks : {
    }
  });
};
