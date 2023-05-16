const Sequelize = require("sequelize");
const sequelize  = require("../config/db.config.js");


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.user = require("../models/user.model"); //(sequelize, Sequelize);


module.exports = db;