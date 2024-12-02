const admindao = require('../../orm/daos/admin/admindao');
const surveydao = require('../../orm/daos/survey/surveydao');

exports.getCourseSurveys = async function(req, res) {
    try {
        surveydao.getCourseSurveys(req).then(data => {
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

exports.getAllCountries = async function(req, res) {
    try {
        admindao.getAllCountries(req).then(data => {
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

exports.getStates = async function(req, res) {
    try {
        admindao.getStates(req).then(data => {
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

exports.getCities = async function(req, res) {
    try {
        admindao.getCities(req).then(data => {
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

exports.getMemberRequests = async function(req, res) {
    try {
        admindao.getMemberRequests(req).then(data => {
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

exports.getCourseOrders = async function(req, res) {
    try {
        admindao.getCourseOrders(req).then(data => {
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

exports.doesExist = async function(req, res) {
    try {
        admindao.doesExist(req).then(data => {
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

exports.doesCartExist = async function(req, res) {
    try {
        admindao.doesCartExist(req).then(data => {
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

exports.fetchOrders = async function(req, res) {
    try {
        admindao.fetchOrders(req).then(data => {
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

exports.cartLogIn = async function(req, res) {
    try {
        admindao.cartLogIn(req).then(data => {
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

exports.changeOrderStatus = async function(req, res) {
    try {
        admindao.changeOrderStatus(req).then(data => {
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
exports.generateBsTokenForWeb = async function(req, res) {
    try {
        admindao.generateBsTokenForWeb(req).then(data => {
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

exports.generateBSToken = async function(req, res) {
    try {
        admindao.generateBSToken(req).then(data => {
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

exports.addCategory = async function(req, res) {
    try {
        admindao.addCategory(req).then(data => {
            res.json(data);
        }).catch(error => {
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to process request" });
    }
}

exports.updateCategory = async function(req, res) {
    try {
        admindao.updateCategory(req).then(data => {
            res.json(data);
        }).catch(error => {
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to process request" });
    }
}

exports.getProvinces = async function(req, res) {
    try {
        admindao.getProvinces(req).then(data => {
            res.json(data);
        }).catch(error => {
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to process request" });
    }
}

exports.addCourse = async function(req, res) {
    try {
        admindao.addCourse(req).then(data => {
            res.json(data);
        }).catch(error => {
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to process request" });
    }
}

exports.registerCourse = async function(req, res) {
    try {
        admindao.registerCourse(req).then(data => {
            res.json(data);
        }).catch(error => {
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to process request" });
    }
}

exports.addIdea = async function(req, res) {
    try {
        admindao.addIdea(req).then(data => {
            res.json(data);
        }).catch(error => {
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to process request" });
    }
}

exports.getIdeas = async function(req, res) {
    try {
        admindao.getIdeas(req).then(data => {
            res.json(data);
        }).catch(error => {
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to process request" });
    }
}

exports.updateIdea = async function(req, res) {
    try {
        admindao.updateIdea(req).then(data => {
            res.json(data);
        }).catch(error => {
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to process request" });
    }
}

exports.doRecurringPayment = async function(req, res) {
    try {
        admindao.doRecurringPayment(req).then(data => {
            res.json(data);
        }).catch(error => {
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to process request" });
    }
}

exports.updateItem = async function(req, res) {
    try {
        admindao.updateItem(req).then(data => {
            res.json(data);
        }).catch(error => {
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to process request" });
    }
}

exports.updateCourse = async function(req, res) {
    try {
        admindao.updateCourse(req).then(data => {
            res.json(data);
        }).catch(error => {
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to process request" });
    }
}

exports.updateCourseStatus = async function(req, res) {
    try {
        admindao.updateCourseStatus(req).then(data => {
            res.json(data);
        }).catch(error => {
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to process request" });
    }
}

exports.updateVendorStatus = async function(req, res) {
    try {
        admindao.updateVendorStatus(req).then(data => {
            res.json(data);
        }).catch(error => {
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to process request" });
    }
}

exports.getCourses = async function(req, res) {
    try {
        admindao.getCourses(req).then(data => {
            res.json(data);
        }).catch(error => {
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to process request" });
    }
}

exports.deleteItem = async function(req, res) {
    try {
        admindao.deleteItem(req).then(data => {
            res.json(data);
        }).catch(error => {
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to process request" });
    }
}

exports.deleteCategory = async function(req, res) {
    try {
        admindao.deleteCategory(req).then(data => {
            res.json(data);
        }).catch(error => {
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to process request" });
    }
}

exports.updateMenuStatus = async function(req, res) {
    try {
        admindao.updateMenuStatus(req).then(data => {
            res.json(data);
        }).catch(error => {
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to process request" });
    }
}

exports.getCategories = async function(req, res) {
    try {
        admindao.getCategories(req).then(data => {
            res.json(data);
        }).catch(error => {
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to process request" });
    }
}

exports.getItems = async function(req, res) {
    try {
        admindao.getItems(req).then(data => {
            res.json(data);
        }).catch(error => {
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to process request" });
    }
}

exports.totalData = async function(req, res) {
    try {
        admindao.totalData(req).then(data => {
            res.json(data);
        }).catch(error => {
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to process request" });
    }
}

exports.getMenuSections = async function(req, res) {
    try {
        console.log(req.body);

        admindao.getMenuSections(req).then(data => {
            res.json(data);
        }).catch(error => {
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to process request" });
    }
}

exports.getMenuSection = async function(req, res) {
    try {
        console.log(req.body);

        admindao.getMenuSection(req).then(data => {
            res.json(data);
        }).catch(error => {
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to process request" });
    }
}

exports.getAllItems = async function(req, res) {
    try {
        console.log(req.body);
        admindao.getAllItems(req).then(data => {
            res.json(data);
        }).catch(error => {
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to process request" });
    }
}

exports.addItem = async function(req, res) {
    try {
        admindao.addItem(req).then(data => {
            res.json(data);
        }).catch(error => {
            res.json(error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to process request" });
    }
}

exports.generatePDF = async function(req, res) {
    try {
        admindao.generatePDF(req).then(data => {
            return data;
        }).catch(error => {
            console.log(error);
            return error;
        });
    } catch (error) {
        console.log(error);
        return { "message": "Failed to process request" };
    }
}

exports.notifyPendingOrders = async function(req, res) {
    try {
        admindao.notifyPendingOrders(req).then(data => {
            return data;
        }).catch(error => {
            console.log(error);
            return error;
        });
    } catch (error) {
        console.log(error);
        return { "message": "Failed to process request" };
    }
}

exports.generateDocusign = async function(req, res) {
    try {
        admindao.generateDocusign(req).then(data => {
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

exports.generateDocusignAuth = async function(req, res) {
    try {
        admindao.generateDocusignAuth(req).then(data => {
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

exports.generateMemberInvoice = async function(req, res) {
    try {
        admindao.generateMemberInvoice(req).then(data => {
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

exports.doPayment = async function(req, res) {
    try {
        admindao.doPayment(req).then(data => {
            console.log("response charge", data);
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

exports.getSettings = async function(req, res) {
    try {
        admindao.getSettings(req).then(data => {
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

exports.updateSettings = async function(req, res) {
    try {
        admindao.updateSettings(req).then(data => {
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

exports.updateStateTaxes = async function(req, res) {
    try {
        admindao.updateStateTaxes(req).then(data => {
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