var express = require('express');
var router = express.Router();

var authController = require('../controllers/authController');

function checkLogin(req, res, next) {
    if (req.session && req.session.username) {
        res.render('/', { uname: req.session.username });
    } else {
        console.log('else');
        next();
    }
}


router.get('/', checkLogin, function(req, res, next) {
    console.log('get/ render /login');
    res.render('login', { msg: '' });
});

// router.post('/', authController.loginPOST);

router.post('/', authController.loginPOST);

module.exports = router;