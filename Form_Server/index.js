var express = require('express');
var fs = require('fs');
var pgp = require('pg-promise')({});
var bodyParser = require('body-parser');

var cn = {
    host: 'localhost',
    port: 5000,
    database: 'Form',
    user: 'postgres',
    password: 'ips'
};

var db = pgp(cn);

var sampleApp = function () {
    'use strict';

    var self = this;
    self.setupVariables = function () {
        self.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
        self.port = process.env.OPENSHIFT_NODEJS_PORT || 8081;

        if (typeof self.ipaddress === 'undefined') {
            console.warn('No OPENSHIFT_NODEJS_IP, using 127.0.0.1');
            self.ipaddress = '127.0.0.1';
        }
    };

    self.populateCache = function () {
        if (typeof self.zcache === 'undefined') {
            self.zcache = {
                'index.html': ''
            };
        }

        self.zcache['index.html'] = fs.readFileSync('./index.html');
    };

    self.cache_get = function (key) {
        return self.zcache[key];
    };

    self.terminator = function (sig) {
        if (typeof sig === 'string') {
            console.log('%s: Received %s - terminating server ...', Date(Date.now()), sig);
            pgp.end();
            process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()));
    };

    self.setupTerminationHandlers = function () {
        process.on('exit', function () {
            self.terminator();
        });

       [
            'SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
            'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function (element, index, array) {
            process.on(element, function () {
                self.terminator(element);
            });
        });
    };

    self.createRoutes = function () {
        self.routes = {};

        self.routes['/'] = function (req, res) {
            res.setHeader('Content-Type', 'text/html');
            res.send(self.cache_get('index.html'));
        };
    };

    self.initializeServer = function () {
        var r;
        self.createRoutes();
        self.app = express();
        self.app.use(bodyParser.json());
        self.app.use(bodyParser.urlencoded({
            extended: false
        }));

        for (r in self.routes) {
            if (self.routes.hasOwnProperty(r)) {
                self.app.get(r, self.routes[r]);
            }
        }
        self.app.post('/register', function (req, res) {
            console.log('post method');
            var user = req.body;
            console.log(user);
            db.any('INSERT INTO register (name, age, email_id, username, password, nationality, gender) values($1, $2, $3, $4, $5, $6, $7)', [user.fname, user.age, user.email_id, user.username, user.pass, user.nationality, user.gender]).then(function (data) {
                console.log('Query successful.\n');
                res.redirect('/ui/login.html');
            }, function (err) {
                console.log('Error: ');
                console.log(err);
                res.status(500).send(err);
            });
        });
        self.app.post('/login', function (req, res) {
            console.log('Login Post Method');
            var credentials = req.body;
            console.log(credentials.username);
            console.log(credentials);
            console.log('select * from register where username=' + '\"' + credentials.username + '\";');
            db.query('select * from register where username=' + '\'' + credentials.username + '\';').then(function (data) {
                console.log(data);
                res.redirect('/ui/queryEngine.html');
            }, function (err) {
                console.log('Error: ');
                return console.error(err);
            });
        });
        self.app.post('/query', function (req, res) {
            console.log('Query post method');
            var query = req.body;
            console.log(query);
            db.any(query).then(function (data) {
                //                res.json()
                console.log(data);
                res.json(data);
            }, function (err) {
                console.log('Error: ');
                console.log(err);
                res.status(500).send(err);
            });
        });

        self.app.use('/ui', express.static('../Form_UI/'));

    }

    self.initialize = function () {
        self.setupVariables();
        self.populateCache();
        self.setupTerminationHandlers();

        self.initializeServer();
    };

    self.start = function () {
        self.app.listen(self.port, self.ipaddress, function () {
            console.log('%s: Node server started on %s:%d .', Date(Date.now()), self.ipaddress, self.port);
        });
    };
};

var zapp = new sampleApp();
zapp.initialize();
zapp.start();
