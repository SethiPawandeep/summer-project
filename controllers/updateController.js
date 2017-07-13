var db = require('../dbConnect');
var bcrypt = require('bcrypt');

exports.updateDesignation = function (req, res) {
    console.log('UPDATE');
    console.log(req.body);
    db.none('UPDATE nicuser SET designation=$1 where empid=$2', [req.body.designation, req.body.empId]).then(function (data) {
        console.log('Updated successfully');
        req.session.designation = req.body.designation;
        res.json({
            a: true
        })
    }).catch(function (err) {
        console.log('Error');
        res.json({
            a: false
        });
    });
};
