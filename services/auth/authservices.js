const authdao = require('../../orm/daos/auth/authdao');
const surveydao = require('../../orm/daos/survey/surveydao');
const functions = require('../../lib/functions');
var moment = require('moment');

exports.talkToSales = async function(req, res) {
    try {
        authdao.talkToSales(req).then(data => {
            res.json(data);
        }).catch(error => {
            console.log(error);
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to process request" });
    }
}

exports.cancelSubscription = async function(req, res) {
    try {
        authdao.cancelSubscription(req).then(data => {
            res.json(data);
        }).catch(error => {
            console.log(error);
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to process request" });
    }
}

exports.submitSurvey = async function(req, res) {
    try {
        surveydao.submitSurvey(req).then(data => {
            res.json(data);
        }).catch(error => {
            console.log(error);
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to process request" });
    }
}

exports.surveyQuestions = async function(req, res) {
    try {
        surveydao.getSurveyQuestions(req).then(data => {
            res.json(data);
        }).catch(error => {
            console.log(error);
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to process request" });
    }
}

exports.verifySMS = async function(req, res) {
    try {
        authdao.verifySMS(req).then(data => {
            res.json(data);
        }).catch(error => {
            console.log(error);
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to process request" });
    }
}


//getCourseData
exports.getCourseData = async function(req, res) {
    try {
        authdao.getCourseData(req).then(data => {
            res.json(data);
        }).catch(error => {
            console.log(error);
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to process request" });
    }
}

exports.authenticate = async function(req, res) {
    try {
        authdao.authenticate(req).then(data => {
            res.json(data);
        }).catch(error => {
            console.log(error);
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to process request" });
    }
}

exports.superAdminLogin = async function(req, res) {
    try {
        authdao.superAdminLogin(req).then(data => {
            res.json(data);
        }).catch(error => {
            console.log(error);
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to process request" });
    }
}

exports.validateAdminOtp = async function(req, res) {
    try {
        authdao.validateAdminOtp(req).then(data => {
            res.json(data);
        }).catch(error => {
            console.log(error);
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to process request" });
    }
}

exports.validateAppOtp = async function(req, res) {
    try {
        authdao.validateAppOtp(req).then(data => {
            res.json(data);
        }).catch(error => {
            console.log(error);
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to process request" });
    }
}

exports.resetUserPassword = async function(req, res) {
    try {
        console.log(req.body);
        authdao.resetUserPassword(req).then(data => {
            res.json(data);
        }).catch(error => {
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to process request" });
    }
}

exports.resetPassword = async function(req, res) {
    try {
        console.log(req.body);
        authdao.resetPassword(req).then(data => {
            res.json(data);
        }).catch(error => {
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to process request" });
    }
}

exports.setPassword = async function(req, res) {
    try {
        authdao.setPassword(req).then(data => {
            console.log(data);
            res.json(data);
        }).catch(error => {
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to process request" });
    }
}

exports.checkSession = async function(req, res) {
    try {
        let bearerHeader = req.headers["authorization"];
        let bearer = bearerHeader.split(" ");
        let bearerToken = bearer[1];
        console.log(bearerHeader);
        if (req.session.token === bearerToken) {
            res.json({ "success": true });
        } else {
            res.status(401).send({ success: false, message: 'Failed to authenticate token.' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to process request" });
    }
}

exports.checkUrlStatus = async function(req, res) {
    try {
        authdao.checkUrlStatus(req).then(data => {
            res.json(data);
        }).catch(error => {
            console.log(error);
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to process request" });
    }
}

exports.registerUser = async function(req, res) {
    try {
        console.log(req.body);
        authdao.registerUser(req).then(data => {
            res.json(data);
        }).catch(error => {
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to process request" });
    }
}

exports.updateUserProfile = async function(req, res) {
    try {
        authdao.updateUserProfile(req).then(data => {
            res.json(data);
        }).catch(error => {
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to process request" });
    }
}

exports.updateAppUserProfile = async function(req, res) {
    try {
        authdao.updateAppUserProfile(req).then(data => {
            res.json(data);
        }).catch(error => {
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to process request" });
    }
}

exports.validateCourseEmail = async function(req, res) {
    try {
        authdao.validateCourseEmail(req).then(data => {
            res.json(data);
        }).catch(error => {
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to process request" });
    }
}



exports.changePassword = async function(req, res) {
    try {
        authdao.changePasswords(req).then(data => {
            res.json(data);
        }).catch(error => {
            console.log(error);
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to process request" });
    }
}

exports.otpVerification = async function(req, res) {
    try {
        console.log(req.body);
        authdao.otpVerification(req).then(data => {
            res.json(data);
        }).catch(error => {
            console.log(error);
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to process request" });
    }
}

exports.forgotPassword = function(req, res) {
    try {
        authdao.forgotPassword(req).then(data => {
            res.json(data);
        }).catch(error => {
            console.log(error);
            res.json(error);
        });
    } catch (e) {
        console.log(e);
        res.status(421).send({ message: 'Failed to process request' });
    }
}

exports.forgotAppPassword = function(req, res) {
    try {
        authdao.forgotAppPassword(req).then(data => {
            res.json(data);
        }).catch(error => {
            console.log(error);
            res.json(error);
        });
    } catch (e) {
        console.log(e);
        res.status(421).send({ message: 'Failed to process request' });
    }
}

exports.validateMobileOTP = function(req, res) {
    try {
        authdao.validateMobileOTP(req).then(data => {
            res.json(data);
        }).catch(error => {
            res.json(error);
        });
    } catch (e) {
        console.log(e);
        res.status(421).send({ message: 'Failed to process request' });
    }
}

exports.checkPasswordResetUrl = function(req, res) {
    try {
        if (req.body.timeStamp) {
            var utcString = new Date().toUTCString();
            var timeNow = moment(new Date(utcString)).utcOffset('+0530').format('YYYY-MM-DD HH:mm:ss');
            var timeStamp = req.body.timeStamp;
            timeStamp = functions.decrypt(timeStamp);
            timeStamp = moment(new Date(timeNow)).diff(timeStamp);
            if (Number(timeStamp) < 86400000) {
                authdao.checkUrlStatus(req).then(data => {
                    res.json(data);
                }).catch(error => {
                    console.log(error);
                    res.json(error);
                });
            } else {
                res.json({ success: false, message: 'url expired' });
            }
        } else {
            res.json({ length: 0, message: 'Invalid url' });
        }
    } catch (e) {
        console.log(e);
        res.status(421).send({ message: 'Failed to process request' });
    }
}