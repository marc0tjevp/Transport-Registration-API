modules.export = {
    insertLocation(req, res) {
        let mrn = req.params.mrn
        let body = req.body
        let lat = body.latitude || ''
        let long = body.longitude || ''
        let date = body.dateTime || ''
        if (lat !== '' && long !== '' && date !== '') {
            db.query('SELECT * FROM cargo_user WHERE mrn = ?', [mrn], function (error, rows, fields) {
                if (error) {
                    res.status(500).json(error).end()
                } else if (rows.length > 0) {
                    db.query('INSERT INTO location (mrn, lat, long, date) VALUES (?)', [[mrn, lat, long, date]], function (error, rows, fields) {
                        if (error) {
                            res.status(500).json(error).end()
                        } else {
                            res.status(200).json({
                                status: 'success'
                            }).end()
                        }
                    })
                } else {
                    res.status(404).json({
                        status: 404,
                        msg: "mrn not found in db"
                    }).end()
                }
            });
        } else {
            res.status(412).json({
                status: 412,
                msg: "Please define alle required data"
            }).end()
        }
    },

    getLocations(req, res) {
        let mrn = req.params.mrn
        db.query('SELECT * FROM cargo_user WHERE mrn = ?', [mrn], function (error, rows, fields) {
            if (error) {
                res.status(500).json(error).end()
            } else if (rows.length > 0) {
                db.query('SELECT long, lat, date FROM location WHERE mrn = ?', [mrn], function (error, rows, fields) {
                    if (error) {
                        res.status(500).json(error).end()
                    } else {
                        res.status(200).json({
                            rows
                        }).end()
                    }
                })
            } else {
                res.status(404).json({
                    status: 404,
                    msg: "mrn not found in db"
                }).end()
            }
        });
    }
}