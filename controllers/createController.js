var db = require('../dbConnect.js');

exports.create = function (req, res) {
    var q1, q2;
    console.log(req.body);
    console.log('asdfa');
    db.any('INSERT INTO datacenters(latitude, longitude, address) values($1, $2, $3) RETURNING id', [req.body.lat, req.body.long, req.body.address]).then(function (data) {
        console.log('first success');
        console.log(JSON.stringify(data));
        console.log(data.id);
        console.log(data[0]);
        console.log(data[0].id);
        
        db.any('INSERT INTO createdby(id, empid) values($1, $2)', [data[0].id, req.session.empId]).then(function (data) {
            console.log('second success');
            console.log(data);
            res.redirect('/');
        }, function (error) {
            console.log(error);
            return res.json({
                failed: 'inner'
            });
        });
    }, function (error) {
        console.log(error);
        return res.json({
            failed: 'outer'
        });

    });

    /*db.tx(function (t) {
        q1 = t.one('INSERT INTO datacenters(latitude, longitude, address) values($1, $2, $3) RETURNING id', [req.body.lat, req.body.long, req.body.address]);
        console.log(q1);
        q2 = t.one('INSERT INTO createdby (id, empid) values($1, $2)', [q1.id, req.session.empId]);
        t.batch([q1, q2]);
    }).then(function (data) {
        console.log(q1);
        console.log(data);
        res.redirect('/');
    }).catch(function (error) {
        console.log(error);
        console.log(q1);
        res.redirect('/random');
    });*/

};