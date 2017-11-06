var express = require('express');
var router = express.Router();

function checkLogin(req, res, next) {
    if (req.session && req.session.empId) {
        if (req.session.isAdmin == false) {
            res.redirect('/');
        } else {
            res.render('adminPanel/index', {
                name: req.session.empName,
                designation: req.session.designation
            });
        }
    } else {
        next();
    }
}

router.get('/', checkLogin, function (req, res, next) {
    res.redirect('/');
});

module.exports = router;