var express = require('express');
var ph
var router = express.Router();
var authController = require('../controllers/authController');


router.get('/', function(req, res) {
    res.render('register', { err: '' });
});

router.post('/', authController.registerPOST);

module.exports = router;