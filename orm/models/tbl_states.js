/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('tbl_states', {
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
        shortCode: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        country_id: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        gst: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        pst: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        hst: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
    }, {
        tableName: 'tbl_states',
        timestamps: false
    });
};