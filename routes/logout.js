var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    if (req.session && req.session.empId) {
        req.session.destroy();
    }
    res.redirect('/');
});

module.exports = router;
