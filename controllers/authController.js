var pgp = require('pg-promise')({});
var request = require('request');
var bcrypt = require('bcrypt');

var recaptchaCredentials = require('../myRecaptcha.js');

var credentials = {
    host: 'localhost',
    port: 5432,
    database: 'pd',
    username: 'pd',
    password: 'pawan123'
}

var db = pgp(credentials);

exports.registerPOST = function(req, res) {
    console.log('registerPOST method');
    console.log(req.body);
    if (req.body.purpose === 'check username') {
        db.one('SELECT * FROM register WHERE username=$1', [req.body.username]).then(function(data) {
            console.log('Data: ' + data);
            console.log('found');
            return res.json({ 'found': true });
        }, function(err) {
            console.log('Error: ', err);
            return res.json({ 'found': false });
        });
    } else {

        if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
            // res.render('register', { err: 'Please select captcha' });
            return res.json({ 'responseCode': 1, 'responseDesc': 'Please select captcha' });
        } else {

            var secretKey = recaptchaCredentials.secretKey;
            var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
            request(verificationUrl, function(error, response, body) {
                body = JSON.parse(body);
                console.log(body);
                if (body.success !== undefined && !body.success) {
                    res.render('register', { err: 'Failed captcha verification.' })
                        // return res.json({ "responseCode": 1, "responseDesc": "Failed captcha verification" });
                } else {
                    console.log(req.body);
                    var user = req.body;
                    bcrypt.genSalt(10, function(err, salt) {
                        bcrypt.hash(user.pass, salt, function(err, hash) {
                            db.any('INSERT INTO register (name, age, email_id, username, password, nationality, gender) values($1, $2, $3, $4, $5, $6, $7)', [user.fname, user.age[0], user.email_id, user.username, hash, user.nationality, user.gender]).then(function(data) {
                                console.log('Query successful.\n');
                                res.redirect('/');
                            }, function(err) {
                                console.log('Error: ');
                                console.log(err);
                                res.status(500).send(err);
                            });
                        });
                    });
                }
            });
        }
    }
};

exports.loginPOST = function(req, res) {
    var credentials = req.body;
    db.one('SELECT * FROM register where username=$1', [credentials.username]).then(function(data) {
            bcrypt.compare(credentials.pass, data.password, function(err, passMatch) {
                if (err) {
                    console.log('Credentials do not match.\n');
                    res.render('login', { msg: 'Invalid username or password' });
                }
                if (passMatch === true) {
                    console.log('Credentials match!');
                    req.session.username = credentials.username;
                    res.render('index', { uname: credentials.username });
                } else {
                    console.log('Credentials do not match.\n');
                    res.render('login', { msg: 'Invalid username or password' });
                }
            });
        },
        function(err) {
            console.log('Error: ');
            console.log(err);
            res.render('login', { msg: 'Invalid username or password' });
        });
};