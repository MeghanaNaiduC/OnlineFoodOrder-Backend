/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbl_idea_log', {
    idea_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    subject: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    devDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    qaDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    demoDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    priorityLevel: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    is_next: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    is_deleted: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'tbl_idea_log',
    timestamps:false
  });
};
