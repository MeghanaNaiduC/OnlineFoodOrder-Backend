const userServices = require('../services/user/userservices');
var cors = require('cors')
var corsOptions = require('./cors');

exports.routes = function(app){
    app.post('/getpopularitems',cors(corsOptions),userServices.getPopularItems);
    app.post('/gettodaystipamount',cors(corsOptions),userServices.getTodaysTipAmount); // Pending
    app.post('/senddriverinvoice',cors(corsOptions),userServices.sendDriverInvoice); // Pending
    app.post('/submitOrder',cors(corsOptions),userServices.submitOrder);
    app.post('/addOneSignalId',cors(corsOptions),userServices.addOneSignalId);
    app.post('/fetchHomeInfo', cors(corsOptions),userServices.fetchHomeInfo);          // Pending
    app.post('/upgradetomember', cors(corsOptions),userServices.upgradeToMember);
    app.post('/appuserlogin', cors(corsOptions),userServices.appUserLogin);
    app.post('/getappuserinfo', cors(corsOptions),userServices.getAppUserInfo);
    app.post('/locationUpdate', cors(corsOptions),userServices.locationUpdate);
    app.post('/locations', cors(corsOptions),userServices.locations);
};