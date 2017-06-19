var express = require('express');
var ph
var router = express.Router();
var registerController = require('../controllers/registerController');


router.get('/', function(req, res) {
	res.render('register', {err: ''});
});

router.post('/', registerController.registerPOST);

module.exports = router;