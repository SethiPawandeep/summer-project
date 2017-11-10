var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
// var db = require('../dbConnect')
router.get('/', function(req, res) {
	res.redirect('/click');
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

});

module.exports =  router;