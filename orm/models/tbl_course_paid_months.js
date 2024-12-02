/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbl_course_paid_months', {
    cpm_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    month_id: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    paid_status: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0'
    },
    paid_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    course_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    year: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    transaction_id: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'tbl_course_paid_months',
    timestamps:false
  });
};
