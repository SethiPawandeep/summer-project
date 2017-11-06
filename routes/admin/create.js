var express = require('express');
var router = express.Router();

var createController = require('../../controllers/createController');

function checkLogin(req, res, next) {
	if(req.session && req.session.isAdmin) {
	        res.render('adminPanel/create');
    } else {
        next();
    }
}

router.get('/', checkLogin, function (req, res, next) {
    console.log('create route');
    res.redirect('/');
});

router.post('/', createController.create);

module.exports = router;