var express = require('express');
var router = express.Router();

function checkLogin(req, res, next) {
    if (req.session && req.session.username) {
        res.render('index');
    } else {
        next();
    }
}

router.get('/', checkLogin, function (req, res) {
    res.render('login');
});

module.exports = router;