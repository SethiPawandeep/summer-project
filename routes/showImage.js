var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    if (req.session) {
        res.render('showImage', { image: 'data:image/png;base64,' + req.session.image });
    }
});

module.exports = router;
