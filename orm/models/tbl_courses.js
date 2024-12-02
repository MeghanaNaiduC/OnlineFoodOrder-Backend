/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbl_courses', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    courseEmail: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    vendorBlueSnapId: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    geometry: {
      type: DataTypes.GEOMETRY('POINT'),
      allowNull: true
    },
    serviceFee: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    tipPerc: {
      type: DataTypes.STRING,
      allowNull: true
    },
    creditcardFee: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    alias: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    maxItems: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    coursePin: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    subscription_cancel: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0'
    },
    is_signup_completed: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0'
    },
    is_active: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '1'
    },
    is_deleted: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0'
    },
    orderAbility: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '1'
    },
    radius: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    is_gst: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0'
    },
    gst: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: '0'
    },
    gst_is_mandatory: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0'
    },
    is_pst: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0'
    },
    pst: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: '0'
    },
    pst_is_mandatory: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0'
    },
    is_hst: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0'
    },
    hst: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: '0'
    },
    hst_is_mandatory: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0'
    },
    is_liquor: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0'
    },
    liquor: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: '0'
    },
    liquor_is_mandatory: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0'
    },
    contract_signed: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '1'
    }
  }, {
    tableName: 'tbl_courses',
    timestamps:false
  });
};
