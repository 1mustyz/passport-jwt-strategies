var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');

/* GET users listing. */
router.post('/register', userController.register);
router.get('/', passport.authenticate("jwt",{session:false}), userController.getUser);
router.post('/login', userController.login);


module.exports = router;
