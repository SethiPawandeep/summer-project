var express = require('express');
var router = express.Router();

var authController = require('../controllers/authController');

function checkLogin(req, res, next) {
	console.log('CheckLogin');
    if (req.session && req.session.username) {
    	console.log(req.session);
        res.render('index', { uname: req.session.username });
    } else {
        next();
    }
}


router.get('/', checkLogin, function(req, res, next) {
    console.log('get/ render /login');
    // res.render('login', { msg: '' });
    res.redirect('/');
});

router.post('/', authController.loginPOST);

router.get('/logout', function(req, res) {
	req.session.destroy();
	res.redirect('/login');
});

module.exports = router;