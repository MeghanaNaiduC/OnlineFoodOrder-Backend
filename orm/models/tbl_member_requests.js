/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbl_member_requests', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    courseId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    last_updated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    /* name: {
      type: DataTypes.STRING(255),
      allowNull: false
    }, */
    ref_code: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    remarks: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    req_status: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '1'
    }
  }, {
    tableName: 'tbl_member_requests',
    createdAt: 'last_updated',
    updatedAt: 'last_updated'
  });
};
