/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbl_course_selected_months', {
    csm_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    course_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    month_id: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    }
  }, {
    tableName: 'tbl_course_selected_months',
    timestamps:false
  });
};
