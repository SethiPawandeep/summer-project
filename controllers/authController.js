var db = require('../dbConnect');
var bcrypt = require('bcrypt');
var request = require('request');
var fs = require('fs');

var recaptchaCredentials = require('../recaptcha.js');

exports.registerPOST = function(req, res) {
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

        request(verificationUrl, function(error, response, body) {
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
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(user.password, salt, function(err, hash) {
                        console.log(hash);
                        db.any('INSERT INTO nicuser (empId, name, designation, password) values($1, $2, $3, $4)', [user.empId, user.empName, user.designation, hash]).then(function(data) {
                            console.log('Query successful');
                            // setUser(req, res, data);
                            req.session.empId = user.empId;
                            req.session.empName = user.empName;
                            req.session.designation = user.designation;
                            req.session.cookie.maxAge = 24 * 60 * 60 * 1000 * 365;
                            req.session.username = 'Username not set.';
                            if(data.empid == '1997') {
                                req.session.isAdmin = true;
                            } else {
                                req.session.isAdmin = false;
                            }
                            console.log(req.session);
                            res.json({
                                'responseCode': 200,
                                'responseDesc': 'Successfully Submitted'
                            });
                        }, function(err) {
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

function assignImage(req, fileName) {
    if(!fileName) {
        fileName = './public/images/boss.png';
    } else {
        fileName = './uploads/' + fileName + '.png'
    }
    var image = fs.readFileSync(fileName);
    req.session.image = new Buffer(image, 'binary').toString('base64');
    req.session.image = 'data:image/png;base64,' + req.session.image;
    console.log(req.session.image);
    return;
}

function setUser(req, res, data) {
                    req.session.empId = data.empid;
                    req.session.empName = data.name;
                    req.session.designation = data.designation;
                    req.session.cookie.maxAge = 24 * 60 * 60 * 1000 * 365;
                    if (data.username === null) {
                        req.session.username = 'Username not set.';
                    } else {
                        req.session.username = data.username;
                    }
                    console.log(req.session);
                    console.log(req.session.cookie);
                    console.log(req.session.image);

                    if (data.empid == '1997') {
                        console.log('true');
                        req.session.isAdmin = true;
                        res.redirect('/admin');
                    } else {
                        console.log('false');
                        req.session.isAdmin = false;
                        res.redirect('/');
                    }
}

exports.loginPOST = function(req, res) {
    var user = req.body;
    console.log('Login post');
    console.log(user);
    db.one('SELECT * FROM nicuser WHERE empid=$1', [user.empName]).then(function(data) {
        bcrypt.compare(user.password, data.password, function(err, passMatch) {
            if (err) {
                console.log('Credentials do not match.');
                res.render('login');
            }
            if (passMatch === true) {
                console.log(data);
                console.log('Credentials match');
                
                db.one('SELECT * FROM imageexists WHERE empid=$1', [user.empName]).then(function(imgExist) {
                    console.log(imgExist);
                    console.log('\n\nBACK\n\n');
                    
                    if(imgExist) {
                        var fileName = user.empName;
                        assignImage(req, fileName);
                    } else {
                        assignImage(req);
                    }
                    setUser(req, res, data);
                }, function(err) {
                    console.log('Error: ', err);
                    assignImage(req);
                    setUser(req, res,  data);
                });

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