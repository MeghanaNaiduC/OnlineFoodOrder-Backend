/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('tbl_cities', {
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
        state_id: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    }, {
        tableName: 'tbl_cities',
        timestamps: false
    });
};