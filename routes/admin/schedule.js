var express = require('express');
var router = express.Router();
var db = require('../../dbConnect');

router.get('/', function(req, res) {
	res.render('adminPanel/schedule');
});

router.get('/emplist', function(req, res) {
	db.many('SELECT empid, name FROM nicuser where empid != 1997').then(function(data) {
		console.log(data);
		console.log(JSON.stringify(data));
		res.send(data);
	}, function(err) {
		console.log('Error: ', err);
	})
});

module.exports = router;