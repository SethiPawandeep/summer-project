var express = require('express');
var ph
var router = express.Router();
var authController = require('../controllers/authController');


function checkLogin(req, res, next) {
	if(req.session && req.session.username) {
		// res.render('index', {uname: req.session.username});
		res.redirect('/');
	} else {
		next();
	}
}

router.get('/', checkLogin, function(req, res) {
    res.render('register', {err: ''});
});

router.post('/', authController.registerPOST);

module.exports = router;