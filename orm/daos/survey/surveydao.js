const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const ORM = require("../../associations/table_associations");
const functions = require("../../../lib/functions");
var moment = require("moment");
var config = require("../../../config");
var param = process.argv[2];
var rp = require("request-promise");
var sequelize = require("sequelize");

exports.getCourseSurveys = async function(req) {
    try {
        let data = req.body;
        let courseId = data.courseId;
        const SurveyQuestions = ORM.model("tbl_survey_answers");

        return SurveyQuestions.sequelize
            .query(
                "SELECT *,CONCAT(MONTHNAME(submitted_at),'-',YEAR(submitted_at)) as month FROM `tbl_survey_answers` WHERE course_id=? GROUP BY MONTH(submitted_at),question_id;", {
                    replacements: [courseId],
                    type: sequelize.QueryTypes.SELECT
                }
            )
            .then(surveys => {
                let surveysArr = {};
                if (surveys) {
                    for (let i = 0; i < surveys.length; i++) {
                        let tempArr = {};
                        if (surveysArr[surveys[i]["month"]]) {
                            tempArr['question_id'] = surveys[i].question_id;
                            tempArr['answer'] = surveys[i].answer;
                            tempArr['remark'] = surveys[i].remark;
                            tempArr['monthYear'] = surveys[i].month;
                            surveysArr[surveys[i]["month"]][surveys[i].question_id] = tempArr;
                        } else {
                            surveysArr[surveys[i]["month"]] = [];
                            tempArr['question_id'] = surveys[i].question_id;
                            tempArr['answer'] = surveys[i].answer;
                            tempArr['remark'] = surveys[i].remark;
                            tempArr['monthYear'] = surveys[i].month;
                            surveysArr[surveys[i]["month"]][surveys[i].question_id] = tempArr;
                        }
                    }
                }
                console.log(surveysArr);

                return { success: true, result: surveysArr };
            });
    } catch (error) {
        console.log(error);
        return { success: false, message: "Something went wrong" };
    }
};

exports.getSurveyQuestions = async function() {
    try {
        const SurveyQuestions = ORM.model("tbl_survey_questions");
        return SurveyQuestions.findAll()
            .then(questions => {
                return { success: true, result: questions };
            })
            .catch(err => {
                console.log(err);
                return { success: false, message: "Something went wrong" };
            });
    } catch (error) {
        console.log(error);
        return { success: false, message: "Something went wrong" };
    }
};

exports.submitSurvey = async function(req) {
    try {
        /* console.log(functions.encrypt('prasanth.chivukula@yahoo.com'));
                             return false;*/
        let data = req.body;
        if (!data.course_id || !data.answers || !data.remarks) {
            return { success: false, message: "Invalid request" };
        }
        let courseEmail = functions.decrypt(data.course_id);
        var dt = new Date();
        let date =
            dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
        let answers = data.answers;
        let remarks = data.remarks;

        const Course = ORM.model("tbl_courses");

        let course = await Course.findOne({ where: { courseEmail: courseEmail } });
        if (!course) {
            return { success: false, message: "Invalid Course" };
        }

        let answersArr = [];
        for (let i = 1; i <= 4; i++) {
            let tempArr = {};
            tempArr["question_id"] = i;
            tempArr["course_id"] = course.id;
            tempArr["submitted_at"] = date;
            tempArr["answer"] = answers[i];
            tempArr["remark"] = remarks[i] !== undefined ? remarks[i] : "";
            answersArr.push(tempArr);
        }
        //console.log(answersArr);
        if (answersArr) {
            const SurveyAnswers = ORM.model("tbl_survey_answers");
            return SurveyAnswers.findOne({
                where: {
                    course_id: course.id,
                    $and: [
                        sequelize.where(
                            sequelize.fn("YEAR", sequelize.col("submitted_at")),
                            dt.getFullYear()
                        ),
                        sequelize.where(
                            sequelize.fn("MONTH", sequelize.col("submitted_at")),
                            dt.getMonth() + 1
                        )
                    ]
                }
            }).then(answers => {
                if (answers) {
                    return {
                        success: false,
                        message: "Survey is already done for this month"
                    };
                }

                return SurveyAnswers.bulkCreate(answersArr).then(result => {
                    if (result) {
                        return {
                            success: true,
                            message: "Survey is done successfully"
                        };
                    } else {
                        return { success: false, message: "Something went wrong" };
                    }
                });
            });
        } else {
            return { success: false, message: "Something went wrong" };
        }
    } catch (error) {
        console.log(error);
        return { success: false, message: "Something went wrong" };
    }
};