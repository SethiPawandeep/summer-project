var express = require('express');
var router = express.Router();
var db = require('../../dbConnect');

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

router.post('/', function(req, res) {
	if(!req.session && req.session.empId) {
		res.redirect('/');
	}
	console.log(req.body);
	db.any('INSERT INTO locations(id, locations) values($1, $2)', [parseInt(req.body.address), req.body.locations]).then(function(data) {
		res.redirect(200, '/');
	},
	function(err) {
		console.log('Error: ', err);
	});

});

module.exports = router;
