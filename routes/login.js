var express = require('express');
var router = express.Router();

var loginController = require('../controllers/authController.js');

router.get('/', function (req, res) {
    res.redirect('/');
});

router.post('/', loginController.loginPOST);

module.exports = router;