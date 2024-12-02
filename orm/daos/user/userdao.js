const ORM = require('../../associations/table_associations');
const bcrypt = require('bcryptjs');
const functions = require('../../../lib/functions');
var config = require('../../../config');
var Sequelize = require("sequelize");
var param = process.argv[2];
var moment = require('moment');
var _ = require('underscore');
const _MS_PER_DAY = 1000 * 60 * 60 * 24;
var url = config.devDB.host;
const assert = require('assert');
var OneSignal = require('onesignal-node');
var originurl = config[param];
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config['sendgridKey']);

var pdf = require('html-pdf');
var ejs = require('ejs');
var fs = require('fs');
var rp = require('request-promise');
var moment = require('moment');
// Use connect method to connect to the server

var oneSignalCartClient = new OneSignal.Client({
    userAuthKey: 'OGFjZGFhNGYtNWQ5YS00OTFlLWE5OTEtNzZhNzg5YjlkYWJj',
    // note that "app" must have "appAuthKey" and "appId" keys
    app: { appAuthKey: 'ZTE5MmE1NDMtNjg1Ni00YWQ3LThiYmQtZjBiOGQ3MGZiMjEw', appId: 'd3006bf2-b3bf-4b7f-8d9e-e4058b16ad7e' }
    //app: { appAuthKey: 'YjE2NWZhMDItMzc0ZC00ZjBhLWEzYTQtMWI0NWFkMzI3NzA0', appId: '7814e749-6401-4de8-8e8d-1aeb6e4f9c38' }

});


exports.pubOrder = function(req) {
    return new Promise(async function(resolve, reject) {
        try {
            console.log(JSON.stringify(req.body));
            var Orders = ORM.model('tbl_orders');
            var OrderDetails = ORM.model('tbl_order_details');
            var Items = ORM.model('tbl_items');
            var Courses = ORM.model('tbl_courses');

            var taxGST = 0;
            var taxPST = 0;
            var taxHST = 0;
            var taxLiquor = 0;
            var courseTaxGST = 0;
            var courseTaxPST = 0;
            var courseTaxHST = 0;
            var courseTaxLiquor = 0;
            var isCourseGst = false;
            var isCoursePst = false;
            var isCourseHst = false;
            var isCourseLiquor = false;
            var totalPrice = 0;
            var serviceFee = 0;
            var creditFee = 0;
            var tip = 0;

            if (!req.body.orderDetails) {
                return reject({ "success": false, "message": "Items are missing" });
            }

            return Courses.findAll({ where: { "id": req.body.courseId } }).then(async courses => {
                if (courses.length) {
                    let courseData = courses[0].get({ plain: true });
                    console.log("--- course", courseData);
                    if (courseData.is_gst !== undefined && courseData.is_gst) {
                        isCourseGst = true;
                        courseTaxGST = courseData.gst;
                    }
                    if (courseData.is_pst !== undefined && courseData.is_pst) {
                        isCoursePst = true;
                        courseTaxPST = courseData.pst;
                    }
                    if (courseData.is_hst !== undefined && courseData.is_hst) {
                        isCourseHst = true;
                        courseTaxHST = courseData.hst;
                    }
                    if (courseData.is_liquor !== undefined && courseData.is_liquor) {
                        isCourseLiquor = true;
                        courseTaxLiquor = courseData.liquor;
                    }
                    for (let i = 0; i < req.body.orderDetails.length; i++) {
                        let item = req.body.orderDetails[i];
                        if (item) {
                            let dbItem = await Items.findAll({ where: { "id": item.item_id } });
                            if (dbItem.length && dbItem[0] != undefined) {
                                dbItem = dbItem[0].get({ plain: true });
                                console.log(dbItem);
                                if (dbItem.is_gst !== undefined && dbItem.is_gst && isCourseGst) {
                                    var percent = Number(courseTaxGST) / 100;
                                    taxGST = parseFloat(taxGST) + parseFloat(item.price * item.quantity * percent)
                                }
                                if (dbItem.is_pst !== undefined && dbItem.is_pst && isCoursePst) {
                                    var percent = Number(courseTaxPST) / 100;
                                    taxPST = parseFloat(taxPST) + parseFloat(item.price * item.quantity * percent)
                                }
                                if (dbItem.is_hst !== undefined && dbItem.is_hst && isCourseHst) {
                                    var percent = Number(courseTaxHST) / 100;
                                    taxHST = parseFloat(taxHST) + parseFloat(item.price * item.quantity * percent)
                                }
                                if (dbItem.is_liquor !== undefined && dbItem.is_liquor && isCourseLiquor) {
                                    var percent = Number(courseTaxLiquor) / 100;
                                    taxLiquor = parseFloat(taxLiquor) + parseFloat(item.price * item.quantity * percent)
                                }

                                totalPrice = parseFloat(totalPrice) + parseFloat(item.price * item.quantity);
                            }
                        }
                    }

                    if (courseData) {
                        if (courseData.serviceFee !== undefined && courseData.serviceFee > 0) {
                            var percent = Number(courseData.serviceFee) / 100;
                            serviceFee = parseFloat(serviceFee) + parseFloat(totalPrice * percent)
                        }

                        if (courseData.creditcardFee !== undefined && courseData.creditcardFee > 0) {
                            var percent = Number(courseData.creditcardFee) / 100;
                            creditFee = parseFloat(creditFee) + parseFloat(totalPrice * percent)
                        }
                    }

                    serviceFee = parseFloat(serviceFee).toFixed(2);
                    creditFee = parseFloat(creditFee).toFixed(2);
                    taxPST = parseFloat(taxPST).toFixed(2);
                    taxGST = parseFloat(taxGST).toFixed(2);
                    taxHST = parseFloat(taxHST).toFixed(2);
                    taxLiquor = parseFloat(taxLiquor).toFixed(2);
                    tip = parseFloat(req.body.tip).toFixed(2);
                    totalPrice = parseFloat(tip) + parseFloat(totalPrice) + parseFloat(creditFee) + parseFloat(serviceFee) + parseFloat(taxGST) + parseFloat(taxPST) + parseFloat(taxHST) + parseFloat(taxLiquor);

                    totalPrice = parseFloat(totalPrice).toFixed(2);
                    console.log("taxGST: " + taxGST, "taxPST: " + taxPST, "taxHST: " + taxHST, "taxLiquor: " + taxLiquor, "servicefee:", serviceFee, "creditfee:", creditFee);
                    let options = {};
                    options["validate"] = true;
                    options["include"] = [OrderDetails];
                    let finalObj = { "tbl_order_details": req.body.orderDetails, "hole": req.body.holeNumber, "user_id": req.body.user_id, "cardholder": req.body.cardholder, "totalPrice": totalPrice, "tip": parseFloat(tip), "taxGST": taxGST, "taxPST": taxPST, "taxHST": taxHST, "taxLiquor": taxLiquor, "serviceFee": serviceFee, "creditFee": creditFee, "memberOrder": ("memberOrder" in req.body) ? req.body.memberOrder : false, "chargeId": req.body.chargeId, "courseId": req.body.courseId, "status": req.body.paymentStatus ? "Pending" : 'Payment Pending', "dateAdded": new Date() };
                    return Orders.create(finalObj, options).then(async function(success) {
                        if (req.body.paymentStatus) {
                            let notifyRes = await notifyDrivers(req.body.courseId);
                        }
                        return resolve({ "success": true, "orderKey": 'OD_' + success.orderId });
                    }).catch(err => {
                        console.log(err);
                        return reject({ success: false, message: 'Something went wrong' });
                    });
                } else {
                    return reject({ success: false, message: 'Course not found' });
                }
            }).catch(err => {
                console.log(err);
                return reject({ success: false, message: 'Something went wrong' });
            });
        } catch (error) {
            console.log(error);
            return reject({ "success": false, "message": "Something went wrong" });
        }
    });
}

exports.addOneSignalId = function(req, key) {
    return new Promise(async function(resolve, reject) {
        try {
            let data = req.body;
            if (!data.type || !data.oneSignalId || !data.phone) {
                return reject({ success: false, message: "Invalid parameters" });
            }
            var Users = ORM.model('tbl_users');
            var Drivers = ORM.model('tbl_drivers');
            if (data.type == "user") {
                let userDoc = await Users.update({ "oneSignalId": data.oneSignalId }, { where: { "phone": data.phone } });
            } else {
                let driverDoc = await Drivers.update({ "oneSignalId": data.oneSignalId }, { where: { "phone": data.phone } });
            }
            return resolve({ success: true, message: "Successful" });
        } catch (error) {
            console.log(error);
            return reject({ "success": false, "message": "Something went wrong" });
        }
    });
}

async function notifyDrivers(courseId) {
    try {
        if (!courseId) {
            return { success: false, message: "Invalid parameters" };
        }
        var Drivers = ORM.model('tbl_drivers');
        var oneSignalIds = [];
        let driverDoc = await Drivers.findAll({ where: { "courseId": courseId } });
        if (driverDoc.length) {
            for (let i = 0; i < driverDoc.length; i++) {
                driverDoc[i] = driverDoc[i].get({ plain: true });
                if (driverDoc[i].oneSignalId && driverDoc[i].oneSignalId != '')
                    oneSignalIds.push(driverDoc[i].oneSignalId);
            }
            var appNotification = new OneSignal.Notification({
                contents: {
                    en: "New order has been placed from 9eighteen user."
                },
                include_player_ids: oneSignalIds
            });
            oneSignalCartClient.sendNotification(appNotification, function(err, httpResponse, data) {
                if (err) {
                    console.log('Something went wrong...' + err);
                    return err;
                } else {
                    console.log(data);
                    return { success: true, message: "Successful", result: data };
                }
            });
        } else {
            return { success: false, message: "Driver not found" };
        }
    } catch (error) {
        console.log(error);
        return { "success": false, "message": "Something went wrong" };
    }
}


exports.getTodaysTipAmount = function(req) {
    return new Promise(async function(resolve, reject) {
        try {
            let data = req.body;
            if (!data.phone) {
                return reject({ success: false, message: "Invalid parameters" });
            }
            const Orders = ORM.model('tbl_orders');
            const DRS = ORM.model('tbl_drivers');
            let driver = await DRS.findOne({ where: { "phone": data.phone } });
            driver = driver.get({ plain: true });
            console.log(driver);
            let queryWhere = { "driverId": driver.id, "dateAdded": { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0), $lte: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59, 59) } };
            console.log(queryWhere);
            return Orders.findAll({ attributes: ['tip'], where: queryWhere }).then(tips => {
                let finalObj = { "totalTip": 0, tips: [] };
                for (let i = 0; i < tips.length; i++) {
                    finalObj['totalTip'] += parseFloat(tips[i]['tip']);
                    finalObj['tips'].push(tips[i]['tip']);
                }
                finalObj['totalTip'] = parseFloat(finalObj['totalTip']).toFixed(2);
                return resolve({ success: true, results: [finalObj] });
            }).catch(err => {
                console.log(err);
                return reject({ success: false, message: 'Something went wrong' });
            });
        } catch (error) {
            console.log(error);
            return reject({ "success": false, "message": "Something went wrong" });
        }
    });
}

exports.sendDriverInvoice = function(req) {
    return new Promise(async function(resolve, reject) {
        try {
            let data = req.body;
            console.log(data);
            if (!data.driverId || !data.email) {
                return reject({ success: false, message: "Invalid params" });
            }
            const Orders = ORM.model('tbl_orders');
            const orderDetails = ORM.model('tbl_order_details');
            const Drivers = ORM.model('tbl_drivers');
            let queryWhere = { "driverId": data.driverId, "status": "Completed", "dateAdded": { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0), $lte: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59, 59) } };
            let orderBy = [
                ["orderId", "desc"]
            ]
            return Orders.findAndCountAll({
                where: queryWhere,
                order: orderBy,
                include: [
                    { model: orderDetails, on: { '$tbl_orders.orderId$': { '$col': 'tbl_order_details.orderId' } } },
                    { model: Drivers, attributes: ['phone', 'name'], on: { '$tbl_orders.driverId$': { '$col': 'tbl_driver.id' } } }
                ]
            }).then(async orders => {
                if (orders.count) {
                    console.log(orders.rows);
                    let orderObj = await generateTotalItemsObj(orders.rows, data);
                    return resolve({ success: true, results: orderObj });
                } else {
                    return resolve({ success: true, results: [] });
                }
            }).catch(err => {
                console.log(err);
                return reject({ success: false, message: "Something went wrong" });
            });
        } catch (err) {
            console.log(err);
            return reject({ "success": false, "message": "Something went wrong" });
        }
    })
}

async function generateTotalItemsObj(orderData, data) {
    try {
        console.log(data, orderData);
        let d = new Date();
        let finalObj = {
            "totalSales": 0,
            "totalTaxes": 0,
            "totalTips": 0,
            "date": new Date().toISOString().slice(0, 10),
            "driverPhone": orderData[0].tbl_driver.phone,
            "driverName": orderData[0].tbl_driver.name ? orderData[0].tbl_driver.name : '',
            "items": []
        };
        if (orderData.length) {
            for (let i = 0; i < orderData.length; i++) {
                let itemObj = {};
                itemObj['orderId'] = orderData[i]['orderId'];
                itemObj['tip'] = parseFloat(orderData[i]['tip']).toFixed(2);
                itemObj['tax'] = parseFloat(orderData[i]['taxGST'] + orderData[i]['taxPST'] + orderData[i]['taxHST'] + orderData[i]['taxLiquor'] + orderData[i]['serviceFee'] + orderData[i]['creditFee']).toFixed(2);
                itemObj['sale'] = parseFloat(orderData[i]['totalPrice'] - itemObj['tip'] - itemObj['tax']).toFixed(2);
                itemObj['orderType'] = orderData[i]['memberOrder'] ? 'Member' : 'Payment';
                finalObj['totalSales'] += parseFloat(itemObj['sale']);
                finalObj['totalTips'] += parseFloat(itemObj['tip']);
                finalObj['totalTaxes'] += parseFloat(itemObj['tax']);
                finalObj['items'].push(itemObj);
            }
        }
        finalObj['totalSales'] = parseFloat(finalObj['totalSales']).toFixed(2);
        finalObj['totalTips'] = parseFloat(finalObj['totalTips']).toFixed(2);
        finalObj['totalTaxes'] = parseFloat(finalObj['totalTaxes']).toFixed(2);
        finalObj['finalSales'] = (parseFloat(finalObj['totalSales']) + parseFloat(finalObj['totalTips']) + parseFloat(finalObj['totalTaxes'])).toFixed(2);
        data.date = finalObj['date'];
        let pdfRes = await generateDriverSalesReport(finalObj, data);
    } catch (error) {
        console.log(error);
        return { success: false, message: 'Something went wrong' };
    }
}

function generateDriverSalesReport(finalObj, data) {
    try {
        console.log("----finalObj", finalObj);
        ejs.renderFile('views/driversales.html', { 'data': finalObj }, null, function(err, str) {
            var options = {
                "directory": "/views",
                "format": "A3", // allowed units: A3, A4, A5, Legal, Letter, Tabloid 
                "orientation": "landscape", // portrait or landscape 
                "base": "file://" + process.cwd() + '/',
                "header": {
                    "height": "40px"
                },
                "footer": {
                    "height": "40px"
                },
            };
            var fname = 'views/' + Date.now() + '.pdf';
            pdf.create(str, options).toFile(fname, async function(err, res1) {
                if (err) return console.log(err);
                console.log(res1.filename);
                //response.render('response', { filename : res.filename }) 
                //response.save();
                let email_res = emailDriverSalesReport(res1.filename, data.email, data.date);
                return { "success": true };
                //res.download(fname);
            });
            return { "success": true };
        });
    } catch (err) {
        console.log(err);
        return { success: false, message: 'Something went wrong' };
    }
}

function base64_encode(file) {
    var bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString('base64');
}

function emailDriverSalesReport(file, email, date) {
    try {
        let data_base64 = base64_encode(file);
        const msg = {
            to: email,
            from: config.fromMailId,
            subject: 'Driver Daily Sales Report – Option Matrix InfoTech.', // Subject line
            html: '<p>Hello, </p></br> <p> Here is the driver sales report for today ( ' + date + ' ). Please contact us at contact@optionmatrix.com for any clarification. </p></br><b>Option Matrix InfoTech.</b>', // html body
            attachments: [{
                filename: 'Driver_Sales_' + new Date().toISOString().slice(0, 10),
                content: data_base64,
                type: 'application/pdf',
                disposition: 'attachment'
            }]
        };
        sgMail.send(msg).then(() => {
            return { "success": true };
        }).catch(error => {
            return { "success": false };
        });
        return { "success": true };
    } catch (err) {
        console.log(err);
        return { "success": false, "message": 'Something went wrong' };
    }
}

exports.fetchHomeInfo = function(req) {
    return new Promise(async function(resolve, reject) {
        try {
            let data = req.body;
            if (!data.latitude || !data.longitude || !data.userId) {
                return reject({ success: false, message: "Invalid parameters" });
            }
            var Courses = ORM.model('tbl_courses');
            var MemberRequests = ORM.model('tbl_member_requests');
            const CoursePaymentStatus = ORM.model('tbl_course_payment_status');
            console.log("lat,lang", data.latitude, data.longitude);
            var attributes = Object.keys(Courses.attributes);
            var location = Sequelize.literal(`ST_GeomFromText('POINT(${data.latitude} ${data.longitude})')`);
            var distance = Sequelize.fn('ST_Distance', Sequelize.literal('geometry'), location);
            //var point = Sequelize.fn('ST_GeomFromText', 'POINT(' + data.longitude + ' ' + data.latitude +')');
            //var intersects = Sequelize.fn('ST_Intersects', Sequelize.col('geometry'), point);
            //attributes.push([distance,'distance']);
            return Courses.findAll({ attributes: attributes, where: Sequelize.and({ "is_active": 1 }, { "is_deleted": 0 }, Sequelize.where(distance, { $lte: { $col: 'radius' } })) }).then(courseDetails => {
                //return Courses.findAll({ attributes: attributes, where: {"id":3} }).then(courseDetails => {    
                if (!courseDetails.length) {
                    return reject({ "success": false, "exists": false, "message": "Hey, we noticed you’re not currently on a oFo partnered course, as soon as you get in range of one a full menu will be updated." });
                }
                if (courseDetails[0]['orderAbility'] != 1) {
                    return reject({ "success": false, "exists": false, "message": "oFo is currently closed for this course. Please contact management to turn on food and beverage ordering." });
                }
                if (courseDetails[0]['subscription_cancel'] == 1) {
                    return reject({ "success": false, "exists": false, "message": "oFo subscription has been cancelled for this course. Please contact management." });
                }
                let finalCourse = courseDetails[0].name;
                courseId = courseDetails[0]['id'];
                let tips = courseDetails[0].tipPerc.split(',');
                let tipPerc1 = tips.length >= 1 ? ((tips[0]) / 100) : 0;
                let tipPerc2 = tips.length >= 2 ? ((tips[1]) / 100) : 0;
                let tipPerc3 = tips.length >= 3 ? ((tips[2]) / 100) : 0;

                isPaymentDone(courseId).then(function(isPaymentDone) {
                    if (isPaymentDone) {
                        isMember(data.userId, courseId).then(function(isMember) {
                            return resolve({ "exists": true, "isMember": isMember, "courseId": '' + courseId, "course": finalCourse, "tipPerc1": tipPerc1, "tipPerc2": tipPerc2, "tipPerc3": tipPerc3 });
                        });
                    } else {
                        return reject({ "success": false, "exists": false, "message": "oFo subscription has been suspended for this course. Please contact management." });
                    }
                });

                async function isMember(userId, courseId) {
                    try {
                        var member = await MemberRequests.findOne({ where: { "user_id": userId, "courseId": courseId } });
                        if (member) {
                            member = member.get({ plain: true });
                            return member.req_status;
                        } else {
                            return 0;
                        }
                    } catch (error) {
                        console.log(error);
                        return reject({ "success": false, "message": "Something went wrong" });
                    }
                }

                async function isPaymentDone(courseId) {
                    try {
                        var payment = await CoursePaymentStatus.count({ where: { "course_id": courseId, "subscription_status": 1 } });
                        if (payment) {
                            return true;
                        } else {
                            return false;
                        }
                    } catch (error) {
                        console.log(error);
                        return reject({ "success": false, "message": "Something went wrong" });
                    }
                }

            }).catch(err => {
                console.log(err);
                return reject({ "success": false, "message": "Something went wrong" });
            });
        } catch (err) {
            console.log(err);
            return reject({ "success": false, "message": "Something went wrong" });
        }
    })
}

exports.getPopularItems = function(req) {
    return new Promise(async function(resolve, reject) {
        try {
            let data = req.body;
            if (!data.menuSectionIds) {
                return reject({ success: false, message: "Invalid parameters" });
            }
            const Items = ORM.model('tbl_items');
            return Items.findAll({ where: { "menuSectionId": { $in: data.menuSectionIds }, "is_popular": true } }).then(popularItems => {
                return resolve({ "success": true, "results": popularItems });
            }).catch(err => {
                console.log(err);
                return reject({ success: false, message: 'Something went wrong' });
            });
        } catch (error) {
            console.log(error);
            return reject({ "success": false, "message": "Something went wrong" });
        }
    });
}

exports.upgradeToMember = function(req) {
    return new Promise(async function(resolve, reject) {
        try {
            let data = req.body;
            if (!data.user_id || !data.req_status || !data.courseId) {
                return reject({ success: false, message: "Invalid params" });
            }
            const MemberRequests = ORM.model('tbl_member_requests');
            const Users = ORM.model('tbl_users');
            data.last_updated = new Date().toISOString().slice(0, 10);
            if (!data.courseId)
                data.req_status = 2;
            await upsert(MemberRequests, data, { "courseId": data.courseId, "user_id": data.user_id });
            if ("firstName" in data) {
                await Users.update({ "firstName": data.firstName, "lastName": data.lastName }, { where: { "id": data.user_id } });
            }
            return resolve({ success: true });
        } catch (err) {
            console.log(err);
            return reject({ "success": false, "message": "Something went wrong" });
        }
    })
}

exports.locationUpdate = function(req) {
    return new Promise(async function(resolve, reject) {
        try {
            let data = req.body;
            if (!data.user_id || !data.latitude || !data.longitude) {
                return reject({ success: false, message: "Invalid params" });
            }
            const Locations = ORM.model('tbl_locations');
            const Orders = ORM.model('tbl_orders');
            let ordersCount = await Orders.count({ where: { "user_id": data.user_id, "status": { $in: ["Reserved", "Pending"] } } });
            if (!ordersCount)
                return resolve({ success: false, "message": "No pending orders" });
            await upsert(Locations, data, { "user_id": data.user_id });
            return resolve({ success: true });
        } catch (err) {
            console.log(err);
            return reject({ "success": false, "message": "Something went wrong" });
        }
    })
}

function upsert(Model, values, condition) {
    return Model.findOne({ where: condition }).then(function(obj) {
        if (obj) { // update
            return obj.update(values);
        } else { // insert
            return Model.create(values);
        }
    })
}

exports.locations = function(req) {
    return new Promise(async function(resolve, reject) {
        try {
            let data = req.body;
            if (!data.user_id) {
                return reject({ success: false, message: "Invalid parameters" });
            }
            const Locations = ORM.model('tbl_locations');
            return Locations.findAll({ where: { "user_id": data.user_id } }).then(locations => {
                if (locations.length)
                    return resolve(locations[0]);
                else
                    return resolve({});
            }).catch(err => {
                console.log(err);
                return reject({ success: false, message: 'Something went wrong' });
            });
        } catch (error) {
            console.log(error);
            return reject({ "success": false, "message": "Something went wrong" });
        }
    });
}

/* exports.appUserLogin = function(req) {
    return new Promise(async function(resolve,reject) {
        try {
            let data = req.body;
            if(!data.phone || !data.password) {
                return reject({success: false, message: "Invalid params"});
            }
            var Users = ORM.model('tbl_users');
            return Users.findAll({where: {"phone": data.phone}}).then(userData => {
                if(userData.length) {
                    userData[0] = userData[0].get({plain:true});
                    bcrypt.compare(data.password, userData[0].password, function(err, result) {
                        if(result === false) {
                            return reject({"success":false, "message":"Invalid credentials"});
                        } else {
                            return resolve({"success":true, "isNew": false, "userId": ''+userData[0]['id']});
                        }
                    });
                } else {
                    req.body.status = "start";
                    return authdao.verifySMS(req).then(otpRes => {
                        return resolve(otpRes);
                    }).catch(err => {
                        console.log(err);
                        return reject({ success: false, message: 'Something went wrong' });
                    });
                }
            }).catch(err => {
                console.log(err);
                return reject({ success: false, message: 'Something went wrong' });
            });
        } catch(err) {
            console.log(err);
            return reject({"success": false , "message": "Something went wrong"});
        }
    })
} */

exports.appUserLogin = function(req) {
    return new Promise(async function(resolve, reject) {
        try {
            let data = req.body;
            if (!data.phone || !data.password) {
                return reject({ success: false, message: "Invalid params" });
            }
            var Users = ORM.model('tbl_users');
            return Users.findAll({ where: { "phone": data.phone } }).then(userData => {
                if (userData.length) {
                    userData[0] = userData[0].get({ plain: true });
                    bcrypt.compare(data.password, userData[0].password, function(err, result) {
                        if (result === false) {
                            return reject({ "success": false, "message": "Wrong password" });
                        } else {
                            return resolve({ "success": true, "userId": '' + userData[0]['id'] });
                        }
                    });
                } else {
                    return reject({ "success": false, "message": "User not found with this phone number." });
                }
            }).catch(err => {
                console.log(err);
                return reject({ success: false, message: 'Something went wrong' });
            });
        } catch (err) {
            console.log(err);
            return reject({ "success": false, "message": "Something went wrong" });
        }
    })
}

exports.getAppUserInfo = function(req) {
    return new Promise(async function(resolve, reject) {
        try {
            let data = req.body;
            if (!data.user_id) {
                return reject({ success: false, message: "Invalid params" });
            }
            var Users = ORM.model('tbl_users');
            return Users.findAll({ where: { "id": data.user_id } }).then(userData => {
                if (userData.length) {
                    return resolve({ "success": true, results: userData[0] });
                } else {
                    return reject({ "success": false, "message": "User not found." });
                }
            }).catch(err => {
                console.log(err);
                return reject({ success: false, message: 'Something went wrong' });
            });
        } catch (err) {
            console.log(err);
            return reject({ "success": false, "message": "Something went wrong" });
        }
    })
}