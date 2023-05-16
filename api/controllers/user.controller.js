const db = require('./../config/db.config');
const User = require('./../models/user.model');
const Users = User

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };

exports.userBoard = (req, res) => {
res.status(200).send("User Content.");
};
  

exports.signin = (req, res) => {

console.log(req)
     Users.findOne({
                where: {
                    id: 'f2ae354c-e5b2-11ed-b5ea-0242ac120002'
                }
            })
            .then( user => {
                token = 'tokentokentokentokentokenww'
                if(!user) {
                    return res.status(404).send( { message: "User not found" });
                };               

                let returnedObject = {
                    id: user.id,
                    login: user.login,
                    password: user.password,
                    accessToken: token,
                    ti : 'tesdt'
                  }
                  
                  return returnedObject;
                  //return res.status(200).send(returnedObject);
                  res.json( returnedObject);

                })
                .catch(
                    err => {
                        res.status(500).send({ message: err.message });
                      }
                );

        

}

