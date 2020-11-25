const connection = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


const register = async (req, res)=>{

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const data = req.body;

    data.password = hash;
   await connection.User.create(
        data        
    )

    res.json("registration successfully");

}
const login = async (req, res)=>{

    const email = req.body.email;
    const password = req.body.password;
    // const data = req.body;

  const user = await connection.User.findOne({
       where:{
           email : email
       },
    //    attributes : ['firstName','lastName','email']
       
   });

   if (!user){
     return  res.json("you have to regiter first");
    }
    
    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword){
        return  res.json("your password is incorrect");
    }

    const payLoad = {
        id : user.id,
    }
    const token = jwt.sign(payLoad,'myVerySecret')
       res.json({
           "token" : token,
           "msg" : "login successfull",
           "user" : user,
           "statusCode" : 200
       });
}

const getUser = async (req, res)=>{
  const data = await connection.User.findAll({
      where:{
          id : req.user.id
      }
  });
    res.json(data);

}


module.exports = {
    register,
    getUser,
    login,
    // loginWithPassport
}
