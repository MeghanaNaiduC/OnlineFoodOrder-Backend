/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbl_order_details', {
    order_details_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    orderId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    item_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    itemNote: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  }, {
    tableName: 'tbl_order_details',
    timestamps : false
  });
};
