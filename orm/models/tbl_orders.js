/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbl_orders', {
    orderId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    dateAdded: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    hole: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    cardholder: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    tip: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    taxGST: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    taxPST: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    taxHST: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    taxLiquor: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    serviceFee: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    creditFee: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    memberOrder: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0'
    },
    chargeId: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    courseId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    driverId: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    tableName: 'tbl_orders',
    createdAt: "dateAdded",
    updatedAt:"dateAdded"
  });
};
