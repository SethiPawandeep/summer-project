var express = require('express');
var router = express.Router();
var db = require('../../dbConnect');

router.get('/', function(req, res) {
	if(req.session && req.session.isAdmin) {
		res.render('adminPanel/schedule');
	} else {
		res.redirect('/');
	}
});

router.post('/', function(req, res){
	console.log(req.body);
	db.any('INSERT INTO duties values($1, $2, $3)', [req.body.name, req.body.address, req.body.date]).then(function(data) {
		console.log('Query Successful');
		res.redirect('/');
	}, function(err) {
		console.log('Error: ', err);
		res.redirect('/');
	});
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