var express = require('express');
var router = express.Router();

//var 

function checkLogin(req, res, next) {
    if (req.session && req.session.empId) {
        res.render('adminPanel/create');
    } else {
        next();
    }
}

router.get('/', checkLogin, function (req, res, next) {
    console.log('create route');
    res.redirect('/');
});

//router.post('/', )

module.exports = router;