var filesystem = require('fs');
var models = {};

var association = function association() {
    var Sequelize = require("sequelize");
    var DataTypes = require("sequelize").DataTypes;
    var sequelize = null;
    var modelsPath = "";
    var logger;
    this.setup = function(path, database, username, password, consoleLogger, obj) {
        modelsPath = path;
        logger = consoleLogger;
        sequelize = new Sequelize(database, username, password, obj);
        sequelize.authenticate().then(function(result) {
            console.log("connected to db " + database);
            console.log(database + " => " + username + " => " + password);
        }).catch(function(err) {
            console.log(err);
        });
        init();
    }

    this.model = function(name) {
        return models[name];
    }

    this.Seq = function() {
        return Sequelize;
    }

    this.getObj = function() {
        return sequelize;
    }

    function setAssociations() {
        models["tbl_courses"].hasMany(models["tbl_menu_sections"], { foreignKey: 'courseId', targetKey: 'courseId' });
        models["tbl_courses"].hasMany(models["tbl_admin_users"], { foreignKey: 'courseId', targetKey: 'courseId' });
        models["tbl_admin_users"].hasOne(models["tbl_states"], { foreignKey: 'id', targetKey: 'state' });
        models["tbl_admin_users"].hasOne(models["tbl_cities"], { foreignKey: 'id', targetKey: 'city' });
        /* models["sg_tbl_users"].hasMany(models["sg_tbl_permissions"], { foreignKey : 'user_id' , targetKey : 'user_id'} ); */
        models["tbl_orders"].hasMany(models["tbl_order_details"], { foreignKey: 'orderId', targetKey: 'orderId' });
        models["tbl_admin_users"].hasOne(models["tbl_courses"], { foreignKey: 'id', targetKey: 'courseId' });
        models["tbl_admin_users"].hasMany(models["tbl_menu_sections"], { foreignKey: 'courseId', targetKey: 'courseId' });
        models["tbl_category_list"].hasMany(models["tbl_items"], { foreignKey: 'categoryId', targetKey: 'id' });
        models["tbl_member_requests"].hasOne(models["tbl_users"], { foreignKey: 'id', targetKey: 'user_id' });
        models["tbl_orders"].hasMany(models["tbl_users"], { foreignKey: 'id', targetKey: 'user_id' });
        models["tbl_orders"].hasOne(models["tbl_drivers"], { foreignKey: 'id', targetKey: 'driverId' });
        models["tbl_menu_sections"].hasMany(models["tbl_category_list"], { foreignKey: 'menuSectionId', targetKey: 'id' });
        models["tbl_order_details"].hasOne(models["tbl_items"], { foreignKey: 'id', targetKey: 'item_id' });
        models["tbl_courses"].hasMany(models["tbl_orders"], { foreignKey: 'courseId', targetKey: 'id' });
        models["tbl_courses"].hasMany(models["tbl_course_bluesnap_details"], { foreignKey: 'vendorBlueSnapId', targetKey: 'vendorBlueSnapId' });
        //  models["tbl_survey_answers"].hasMany(models["tbl_survey_questions"], { foreignKey: 'question_id', targetKey: 'question_id' });
        models["tbl_survey_answers"].hasMany(models["tbl_courses"], { foreignKey: 'id', targetKey: 'course_id' });
        models["tbl_courses"].hasMany(models["tbl_course_selected_months"], { foreignKey: 'course_id', targetKey: 'id' });
        models["tbl_courses"].hasMany(models["tbl_course_paid_months"], { foreignKey: 'course_id', targetKey: 'id' });
        models["tbl_courses"].hasMany(models["tbl_course_payment_status"], { foreignKey: 'course_id', targetKey: 'id' });
    }


    function init() {
        filesystem.readdirSync(modelsPath).forEach(function(name) {
            if (name.indexOf(".swp") == -1) {
                var modelName = name.replace(/\.js$/i, "");
                var object = require("../models/" + modelName)(sequelize, DataTypes);
                models[modelName] = object;
            } else {
                logger.log(name);
            }
        });
        setAssociations();
    }
}

association.instance = null;

association.getInstance = function() {
    if (this.instance === null) {
        this.instance = new association();
    }
    return this.instance;
}

module.exports = association.getInstance();