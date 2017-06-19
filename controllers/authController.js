var pgp = require('pg-promise')({});

var credentials = {
    host: 'localhost',
    port: 5432,
    database: 'pd',
    username: 'pd',
    password: 'pawan123'
}

var db = pgp(credentials);

exports.registerPOST = function(req, res) {
    console.log(req.body);
    var user = req.body;
    console.log(db);
    if (user.pass != user.passConfirm) {
        res.render('register', { err: 'Password and Confirm Password do not match' });
    }
    db.any('INSERT INTO register (name, age, email_id, username, password, nationality, gender) values($1, $2, $3, $4, $5, $6, $7)', [user.fname, user.age, user.email_id, user.username, user.pass, user.nationality, user.gender]).then(function(data) {
        console.log('Query successful.\n');
        // res.redirect('/');
        res.render('login', { msg: '' });
    }, function(err) {
        console.log('Error: ');
        console.log(err);
        res.status(500).send(err);
    });

};

exports.loginPOST = function(req, res) {
    console.log(req.body);
    var credentials = req.body;
    console.log('here');
    db.one('SELECT * FROM register where username=$1 and password=$2', [credentials.username, credentials.pass]).then(function(data) {
        console.log('Credentials match!');
        req.session.username = credentials.username;
        console.log(req.session.username);
        console.log(data);
        res.render('index', { uname: credentials.username });
    }, function(err) {
        console.log('Error: ');
        console.log(err);
        console.log('Invalid ');
        res.render('login', { msg: 'Invalid username or password' });
    })
};