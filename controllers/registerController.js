var pgp = require('pg-promise')({});

var credentials = {
	host: 'localhost',
	port: 5432,
	database: 'register',
	username: 'postgres',
	password: 'pawan123',
}

var db = pgp(credentials);

exports.registerSubmit = function(req, res) {
	console.log(req.body);
	var newUser = req.body;
	console.log(db);
	// db.any()
	res.render('register');
};