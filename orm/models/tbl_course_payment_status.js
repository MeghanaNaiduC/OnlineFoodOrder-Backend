/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbl_course_payment_status', {
    tcp_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    course_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    subscription_start_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    next_due_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    subscription_end_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    subscription_status: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    bluesnap_subscription_id: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    vaultedShopperId: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    last_updated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'tbl_course_payment_status',
    timestamps:false
  });
};
