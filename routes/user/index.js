var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	console.log('user route');
	if(req.session && req.session.empId){
		res.render('userPanel/index', {
			name: req.session.empName,
			designation: req.session.designation
		});
	} else {
		res.redirect('/');
	}
});

module.exports = router;