var db = require('../dbConnect.js');

exports.create = function (req, res) {
    console.log(req.body);
    db.tx(function (t) {
        var q1 = t.one('INSERT INTO datacenters(latitude, longitude, address) values($1, $2, $3) RETURNING id', [req.body.lat, req.body.long, req.body.address]);
        var q2 = t.one('INSERT INTO createdby (id, empid) values($1, $2)', [q1.id, req.session.empId]);
        return t.batch([q1, q2]);
    }).then(function (data) {
        console.log(data);
        res.redirect('/');
    }).catch(function (error) {
        console.log(error);
        res.redirect('/random');
    });
};