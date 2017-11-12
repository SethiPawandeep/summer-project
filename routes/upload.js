var express = require('express');
var router = express.Router();
var fs = require('fs');
var db = require('../dbConnect')

router.get('/', function(req, res) {
	res.render('upload');
});

router.post('/', function(req, res) {
	if(!req.session) {
		res.redirect('/');
	}
	req.session.image = 'data:image/png;base64,' + req.body.d.split(',')[1];
	console.log(req.session);
	var s = req.body.d.split(',')[1];
	fs.writeFile('uploads/' + req.session.empId + '.png', s, 'base64', function(err) {
		console.log(err);
		res.send(err);
	});
	console.log('post upload');
});

router.get('/db', function(req, res) {
	console.log('here');
	console.log(req.session);
	db.any('INSERT INTO imageexists values($1)', [req.session.empId]).then(function(data) {
		console.log('inside');
		res.redirect('/');
	},
	function(err) {
		console.log('Error: ', err);
		res.send(err);
	});
});

module.exports =  router;