const ApiResponse = require('../model/ApiResponse')
const db = require('../database/database')

module.exports = {

    insertLocation(req, res) {
        let mrn = req.params.mrn
        let body = req.body
        let lat = body.lat || ''
        let long = body.long || ''
        let date = body.dateTime || ''
        console.dir(body);
        if (lat !== '' && long !== '' && date !== '') {
            db.query('SELECT * FROM cargo_user WHERE mrn = ?', [mrn], function (error, rows, fields) {
                if (error) {
                    res.status(500).json(new ApiResponse(500, error)).end()
                    console.dir(error)
                } else if (rows.length > 0) {
                    db.query('INSERT INTO location (`mrn`, `lat`, `long`, `dateTime`) VALUES (?)', [
                        [mrn, lat, long, date]
                    ], function (error, rows, fields) {
                        if (error) {
                            res.status(500).json(new ApiResponse(500, error)).end()
                            console.dir(error)
                        } else {
                            res.status(200).json(new ApiResponse(500, "Added location into database")).end()
                        }
                    })
                } else {
                    res.status(404).json(new ApiResponse(404, "There are no location pointers for this MRN")).end()
                }
            });
        } else {
            res.status(412).json(new ApiResponse(412, "Parameters missing, please check if mrn, latitude, longitude or datetime is missing")).end()
        }
    },

    getLocations(req, res) {
        let mrn = req.params.mrn
        db.query('SELECT * FROM cargo_user WHERE mrn = ?', [mrn], function (error, rows, fields) {
            if (error) {
                res.status(500).json(error).end()
            } else if (rows.length > 0) {
                db.query('SELECT `long`, `lat`, `dateTime` FROM location WHERE mrn = ?', [mrn], function (error, rows, fields) {
                    if (error) {
                        res.status(500).json(new ApiResponse(500, error)).end()
                    } else {
                        res.status(200).json(new ApiResponse(200, rows)).end()
                    }
                })
            } else {
                res.status(404).json(new ApiResponse(404, "There are no location pointers for this MRN")).end()
            }
        });
    }
}