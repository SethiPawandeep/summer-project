var db = require('../dbConnect');

exports.fetchCentresList = function (req, res) {
    db.many('SELECT id, address from datacenters').then(function (data) {
        console.log(data);
        console.log(JSON.stringify(data));
        return res.send(data);
        //        return data;
    }, function (error) {
        console.log('Error: ', error);
    });
};
