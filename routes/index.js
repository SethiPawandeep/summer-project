var express = require('express');
var router = express.Router();

function checkLogin(req, res, next) {
    if (req.session && req.session.empId) {
        if (req.session.isAdmin) {
            res.redirect('/admin');
        } else {
            console.log('Reached here');
            console.log(req.session.image);
            res.render('index', {
                name: req.session.empName,
                designation: req.session.designation,
                image: req.session.image
            });
        }
    } else {
        next();
    }
}

router.get('/', checkLogin, function (req, res) {
    res.render('login');
});

module.exports = router;
