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

    if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
        return res.json({ 'responseCode': 1, 'responseDesc': 'Please select captcha' });
    }

    var secretKey = recaptchaCredentials.secretKey;
    var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
    request(verificationUrl, function(error, response, body) {
        body = JSON.parse(body);
        console.log(body);
        if (body.success !== undefined && !body.success) {
            console.log('FAIL HO GAYE');
            return res.json({ "responseCode": 1, "responseDesc": "Failed captcha verification" });
        }
        console.log(req.body);
        var user = req.body;
        console.log(db);
        if (user.pass != user.passConfirm) {
            res.render('register');
        } else {
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(user.pass, salt, function(err, hash) {
                    console.log(hash);
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