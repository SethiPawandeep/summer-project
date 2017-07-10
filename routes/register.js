var express = require('express');
var router = express.Router();

var registerController = require('../controllers/authController');

router.get('/', function(req, res, next) {
    res.render('register');
});

router.post('/', registerController.registerPOST);

module.exports = router;