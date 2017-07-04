module.exports = function (io) {
    var express = require('express');
    var router = express.Router();
    
    function checkLogin(req, res, next) {
        if(req.session && req.session.username) {
            res.render('chat');
        } else {
            next();
        }
    }
    
    router.get('/', checkLogin, function(req, res) {
        res.redirect('/');
    });
    
    io.on('connection', function(socket) {
        console.log('route user connected');
        console.log(socket.username);
        socket.on('chat message', function(msg) {
            console.log('Message: ', msg);
//            io.emit('chat message', req.session.username + ': ' +  msg);
        });
    });
    return router;
}
