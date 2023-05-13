const Sequelize = require('sequelize');
const db = require('../config/db.config');


const Users = db.define("users", {

  login: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      }
    },
    
    {
        timestamps: false
      }
    );
  


  module.exports = Users;