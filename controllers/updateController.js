var db = require('../dbConnect');
var bcrypt = require('bcrypt');

exports.updateDesignation = function (req, res) {
    console.log('UPDATE');
    console.log(req.body);
    if(req.body.username === 'Username not set.') {
        req.body.username = null;
    }
    db.none('UPDATE nicuser SET designation=$1, username=$2 where empid=$3', [req.body.designation, req.body.username, req.body.empId]).then(function (data) {
        console.log('Updated successfully');
        req.session.designation = req.body.designation;
        if(req.body.username === null) {
            res.json({
                a: 1
            });
        } else {
            req.session.username = req.body.username;
            res.json({
                a: 2
            });
        }
    }).catch(function (err) {
        console.log('Error: ', err);
        res.json({
            a: 0
        });
    });
};
