const Sequelize = require("sequelize");
const sequelize  = require("../config/db.config.js");


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.user = require("../models/user.model"); //(sequelize, Sequelize);
//console.log(db.user)

// db.role = require("../models/role.model.js")(sequelize, Sequelize);

// db.role.belongsToMany(db.user, {
//   through: "user_roles",
//   foreignKey: "roleId",
//   otherKey: "userId"
// });
// db.user.belongsToMany(db.role, {
//   through: "user_roles",
//   foreignKey: "userId",
//   otherKey: "roleId"
// });

//db.ROLES = ["user", "admin", "moderator"];

module.exports = db;