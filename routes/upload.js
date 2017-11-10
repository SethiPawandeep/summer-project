var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');

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

	// var data = req.body.d.split(',')[1];
	console.log('post upload');
	// console.log(data);

/*    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      // var newpath = 'C:/Users/Your Name/' + files.filetoupload.name;
      var newpath = '/home/pd/tempDir/' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });
 });
*/
});

module.exports =  router;