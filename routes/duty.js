var express = require('express');
var router = express.Router();
var db = require('../dbConnect');

router.get('/', function(req, res) {
	if(req.session && req.session.empId) {
		res.render('duty');
	} else {
		res.redirect('/');
	}
});

router.get('/fetch', function(req, res) {
	console.log(req.session.empId);
	db.many('SELECT address FROM datacenters where id in (select address from duties WHERE empid = $1)', [req.session.empId]).then(function(data) {
		console.log(JSON.stringify(data));
		return res.send(data);
	},
	function(err) {
		console.log('Error: ', err);
		res.send('Error');
	});
});

module.exports = router;