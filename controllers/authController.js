var pgp = require('pg-promise')({});
var bcrypt = require('bcrypt');
var request = require('request');

var recaptchaCredentials = require('../recaptcha.js');

var credentials = {
    host: 'localhost',
    port: 5000,
    database: 'NIC_db',
    user: 'postgres',
    password: 'ips'
};

var db = pgp(credentials);

exports.registerPOST = function (req, res) {
    console.log('registerPOST');
    console.log(req.body);
    if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
        return res.json({
            'responseCode': 1,
            'responseDesc': 'Please select captcha'
        });
    } else {
        var key = recaptchaCredentials.key;
        var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + key + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;

        request(verificationUrl, function (error, response, body) {
            body = JSON.parse(body);
            console.log('\n\n\nafter req\n\n\n');
            console.log(body);
            if (body.success !== undefined && !body.success) {
                console.log('if');
                return res.json({
                    'responseCode': 2,
                    'responseDesc': 'Failed captcha verification'
                });
            } else {
                console.log(req.body);
                var user = req.body;
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(user.password, salt, function (err, hash) {
                        console.log(hash);
                        db.any('INSERT INTO nicuser (empId, name, designation, password) values($1, $2, $3, $4)', [user.empId, user.empName, user.designation, hash]).then(function (data) {
                            console.log('Query successful');
                            console.log(data);
                            res.json({
                                'responseCode': 200,
                                'responseDesc': 'Successfully Submitted'
                            });
                        }, function (err) {
                            console.log('Error: ');
                            console.log(err);
                            if (err.code == '23505') {
                                res.json({
                                    'responseCode': err.code,
                                    'responseDesc': 'unique key error'
                                });
                            }
                        });
                    });
                });
            }
        });
    }
};

exports.loginPOST = function (req, res) {
    var user = req.body;
    console.log('Login post');
    console.log(user);
    db.one('SELECT * FROM nicuser WHERE empid=$1',[user.empName]).then(function(data) {
        bcrypt.compare(user.password, data.password, function(err, passMatch) {
            if(err) {
                console.log('Credentials do not match.');
                res.render('login');
            }
            if(passMatch === true) {
                console.log('Credentials match');
            /*Create Session*/    
                res.render('index');
            } else {
                console.log('Credentials do not match');
                res.render('login');
            }
        });
    }, function(err) {
        console.log('Error: ');
        console.log(err);
        res.render('login');
    })
};
