/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbl_course_bluesnap_details', {
    cbd_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    bankName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    bankId: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    country: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    state: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    zip: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    bankAccountId: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    minimalPayoutAmount: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '25'
    },
    payoutType: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: 'WIRE'
    },
    baseCurrency: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: 'CAD'
    },
    nameOnAccount: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    bankAccountType: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    bankAccountClass: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    commissionPercent: {
      type: "DOUBLE",
      allowNull: false
    },
    defaultPayoutCurrency: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: 'CAD'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    vendorBlueSnapId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    vendorAccountStatus: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: 'Active'
    },
    vendorPayoutStatus: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: 'Pending'
    },
    vendorProcessingStatus: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: 'Active'
    },
    personalIdentificationNumber: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    passportNumber: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    driverLicenseNumber: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'tbl_course_bluesnap_details',
    timestamps:false
  });
};
