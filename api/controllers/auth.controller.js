const User = require('./../models/user.model');
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
const Users = User


exports.noAccess  = (req, res) => {
    res.status(200).send('Access denied !!!')
}

exports.testAuth = (req, res) => {
    res.status(200).send( { message: 'test auth'});
}

exports.signin = (req, res) => {


    Users.findOne({
            where: {
                login: req.body.login
            }
        })
        .then( user => {
            if(!user) {
                return res.status(404).send( { message: "User not found" });
            };               

            //console.log(bcrypt.de)
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
              );
        
              if (!passwordIsValid) {
                return res.status(401).send({
                  accessToken: null,
                  message: "Invalid Password!"
                });
              }
            
            
            
            var token = jwt.sign({ id: user.id , login: user.login}, config.secret, {
                expiresIn: 86400 // 24 hours
              });

            let returnedObject = {
                id: user.id,
                login: user.login,
                password: user.password,
                accessToken: token,
                xtrasmthng : 'Could you find something interesting here?'
                }
                res.status(200).send(returnedObject);

            })
            .catch(
                err => {
                    res.status(500).send({ message: err.message });
                    }
            );

        

}

