/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('tbl_countries', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        sortname: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        phonecode: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        is_active: {
            type: DataTypes.INTEGER(4),
            allowNull: false,
            defaultValue: '0'
        }
    }, {
        tableName: 'tbl_countries',
        timestamps: false
    });
};