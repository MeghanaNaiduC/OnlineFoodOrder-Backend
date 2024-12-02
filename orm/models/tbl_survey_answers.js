module.exports = function(sequelize, DataTypes) {
    return sequelize.define('tbl_survey_answers', {
        answer_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        question_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        answer: {
            type: DataTypes.SMALLINT,
            allowNull: false
        },
        course_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        remark: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        submitted_at: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'tbl_survey_answers',
        timestamps: false
    });
};