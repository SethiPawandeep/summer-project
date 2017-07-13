var express = require('express');
var router = express.Router();

function checkLogin(req, res, next) {
    console.log(req.session);
    console.log('ADMIN PANEL');
    if (req.session && req.session.empId) {
        console.log('if');
        res.render('adminPanel/index', {
            name: req.session.empName,
            designation: req.session.designation,
        });
    } else {
        next();
    }
}

router.get('/', checkLogin, function (req, res, next) {
    res.redirect('/');
});

module.exports = router;