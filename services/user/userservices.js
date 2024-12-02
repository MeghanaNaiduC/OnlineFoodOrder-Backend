const userdao = require('../../orm/daos/user/userdao');

exports.submitOrder = async function(req,res){
    try {
        userdao.pubOrder(req).then(data => {
            res.json(data);
        }).catch(error => {
            console.log(error);
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({"message":"Failed to process request"});
    }
}


exports.getTodaysTipAmount = async function(req,res){
    try {
        userdao.getTodaysTipAmount(req).then(data => {
            res.json(data);
        }).catch(error => {
            console.log(error);
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({"message":"Failed to process request"});
    }
}

exports.sendDriverInvoice = async function(req,res){
    try {
        userdao.sendDriverInvoice(req).then(data => {
            res.json(data);
        }).catch(error => {
            console.log(error);
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({"message":"Failed to process request"});
    }
}

exports.upgradeToMember = async function(req,res){
    try {
        userdao.upgradeToMember(req).then(data => {
            res.json(data);
        }).catch(error => {
            console.log(error);
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({"message":"Failed to process request"});
    }
}

exports.appUserLogin = async function(req,res){
    try {
        userdao.appUserLogin(req).then(data => {
            res.json(data);
        }).catch(error => {
            console.log(error);
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({"message":"Failed to process request"});
    }
}

exports.getAppUserInfo = async function(req,res){
    try {
        userdao.getAppUserInfo(req).then(data => {
            res.json(data);
        }).catch(error => {
            console.log(error);
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({"message":"Failed to process request"});
    }
}

exports.fetchHomeInfo = async function(req,res){
    try {
        userdao.fetchHomeInfo(req).then(data => {
            res.json(data);
        }).catch(error => {
            console.log(error);
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({"message":"Failed to process request"});
    }
}

exports.locationUpdate = async function(req,res){
    try {
        userdao.locationUpdate(req).then(data => {
            res.json(data);
        }).catch(error => {
            console.log(error);
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({"message":"Failed to process request"});
    }
}

exports.locations = async function(req,res){
    try {
        userdao.locations(req).then(data => {
            res.json(data);
        }).catch(error => {
            console.log(error);
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({"message":"Failed to process request"});
    }
}

exports.addOneSignalId = async function(req,res){
    try {
        userdao.addOneSignalId(req).then(data => {
            res.json(data);
        }).catch(error => {
            console.log(error);
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({"message":"Failed to process request"});
    }
}

exports.getPopularItems= async function(req,res){
    try {
        userdao.getPopularItems(req).then(data => {
            res.json(data);
        }).catch(err => {
            console.log(err);
            res.json(err);
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({"message":"Failed to process request"});
    }
}


