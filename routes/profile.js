var express = require('express');
var router = express.Router();

var updateController = require('../controllers/updateController');

function checkLogin(req, res, next) {
    if (req.session && req.session.empId) {
        res.render('profile', {
            name: req.session.empName,
            empId: req.session.empId,
            designation: req.session.designation,
            username: req.session.username
        });
    } else {
        next();
    }
}

router.get('/', checkLogin, function (req, res, next) {
    res.redirect('/');
});

router.post('/', updateController.updateDesignation);

module.exports = router;
