var express = require('express');
var router = express.Router();
var db = require('../dbConnect');


router.get('/', function(req, res) {
	res.redirect('/duty');
});

router.post('/', function(req, res) {
	// console.log(req.session);
	console.log(JSON.stringify(req.body));
	db.many('select latitude, longitude from datacenters where address = $1', [req.body.address]).then(function(data) {
		console.log(data);
		res.render('perform');
	},
	function(err) {
		console.log('Error: ', err);
		res.send('err');
	});
});

module.exports = router;