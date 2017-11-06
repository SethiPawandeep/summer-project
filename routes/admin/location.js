var express = require('express');
var router = express.Router();

var fetch = require('../../controllers/fetchCentresController');

function checkLogin(req, res, next) {
    if(req.session && req.session.isAdmin) {
        res.render('adminPanel/location');
    } else {
        next();
    }
}

router.get('/', checkLogin, function (req, res) {
    console.log('location route');
    res.redirect('/');
});

router.get('/fetch', fetch.fetchCentresList);

module.exports = router;
