var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	if(req.session && req.session.empId) {
		res.render('click');
	} else {
		res.redirect('/');
	}
});

module.exports = router;