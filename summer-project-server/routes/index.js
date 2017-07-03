var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    var username = req.session.username;
    if (req.session && req.session.username) {
        res.render('index', { uname: username });
    }
    res.render('login', {msg: ''});
});

module.exports = router