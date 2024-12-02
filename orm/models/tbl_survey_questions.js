module.exports = function(sequelize, DataTypes) {
    return sequelize.define('tbl_survey_questions', {
        question_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        question: {
            type: DataTypes.STRING(1000),
            allowNull: false
        },
        question_type: {
            type: DataTypes.STRING(30),
            allowNull: true
        }
    }, {
        tableName: 'tbl_survey_questions',
        timestamps: false
    });
};