const authServices = require('../services/auth/authservices');
var cors = require('cors')
var corsOptions = require('./cors');

exports.routes = function(app) {
    app.post('/login', cors(corsOptions), authServices.authenticate);
    app.get('/checksession', cors(corsOptions), authServices.checkSession);
    app.post('/checkurlstatus', cors(corsOptions), authServices.checkUrlStatus);
    app.post('/checkresetpassurlstatus', cors(corsOptions), authServices.checkPasswordResetUrl);
    app.post('/forgotpassword', cors(corsOptions), authServices.forgotPassword);
    app.post('/forgotapppassword', cors(corsOptions), authServices.forgotAppPassword);
    app.post('/validateappotp', cors(corsOptions), authServices.validateAppOtp);
    app.post('/registeruser', cors(corsOptions), authServices.registerUser);
    app.post('/resetuserpassword', cors(corsOptions), authServices.resetUserPassword);
    app.post('/resetpassword', cors(corsOptions), authServices.resetPassword);
    app.post('/setpassword', cors(corsOptions), authServices.setPassword);
    app.post('/validateotp', cors(corsOptions), authServices.validateMobileOTP);
    app.post('/otp', cors(corsOptions), authServices.otpVerification);
    app.post('/updateuserprofile', cors(corsOptions), authServices.updateUserProfile);
    app.post('/updateappuserprofile', cors(corsOptions), authServices.updateAppUserProfile);
    app.post('/courseemailvalidator', cors(corsOptions), authServices.validateCourseEmail);
    app.post('/superadminlogin', cors(corsOptions), authServices.superAdminLogin);
    app.post('/adminvalidateotp', cors(corsOptions), authServices.validateAdminOtp);
    app.put('/changepassword', cors(corsOptions), authServices.changePassword);
    app.post('/getCourseData', cors(corsOptions), authServices.getCourseData);
    app.post('/verifySMS', cors(corsOptions), authServices.verifySMS);
    app.get('/get-survey-questions', cors(corsOptions), authServices.surveyQuestions);
    app.post('/submit-survey', cors(corsOptions), authServices.submitSurvey);
    app.post('/cancel-subscription', cors(corsOptions), authServices.cancelSubscription);
    app.post('/talktosales', cors(corsOptions), authServices.talkToSales);
    app.post('/logout', cors(corsOptions), function(req, res) {
        try {
            if (req.session) {
                req.session.destroy();
            }
            res.json({ success: true, message: 'Logged out successfully' });
        } catch (e) {
            res.status(421).send({ message: 'Failed to process request' });
        }
    });
};