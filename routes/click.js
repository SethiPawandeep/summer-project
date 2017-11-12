var express = require('express');
var router = express.Router();
var db = require('../dbConnect');

router.get('/', function(req, res) {
	if(req.session && req.session.empId) {
		res.render('click');
	} else {
		res.redirect('/');
	}
});

router.post('/', function(req, res) {
	// console.log(req.body.d.split(',')[1]);
	if(!req.session) {
		res.redirect('/');
	}
	req.session.image = req.body.d.split(',')[1];
	console.log(req.session);
	var s = req.body.d.split(',')[1];
	fs.writeFile('uploads/' + req.session.empId + '.png', s, 'base64', function(err) {
		console.log(err);
		res.send(err);
	});
	

	console.log('post upload');

	// req.session.image()
	// res.redirect('/');
	/*.then(function() {
		db.any('INSERT INTO imageexists values($1)', [req.session.empId]).then(function(data) {
			res.redirect('/');
		}, function(err) {
			console.log('Error: ', err);
			res.err('Error');
		});
	});*/
});

module.exports = router;