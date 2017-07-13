var express = require('express');
var router = express.Router();

function checkLogin(req, res, next) {
    console.log('reached here');
    if (req.session && req.session.empId) {
        console.log('yahan');
        res.render('profile');
    } else {
        next();
    }
}

router.get('/', checkLogin, function (req, res, next) {
    console.log('NEXT');
    res.redirect('/');
});

module.exports = router;
