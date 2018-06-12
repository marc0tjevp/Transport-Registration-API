const drivetime = require('../model/DriveTime')
const db = require('../database/database')
const ApiResponse = require('../model/ApiResponse')

function sendDriveTimes(req, res) {
    console.log('POST sendDriveTimes function called')

    //Get params from body
    let startTime = req.body.startTime
    let endTime = req.body.endTime
    let travelTime = req.body.travelTime
    let mrn = req.body.mrn
    let driverID = req.body.driverID

    //Check if params exist
    if (!startTime || !endTime || !mrn || !driverID || !travelTime) {
        res.status(412).json(new ApiResponse(412, "Please make sure to insert startTime, endTime, travelTime, mrn and driverID")).end()
        return
    }

    // Check if all paramaters are filled in
    if (startTime == '' || endTime == '' || mrn == '' || driverID == '' || travelTime == '') {
        res.status(412).json(new ApiResponse(412, "Please make sure to insert startTime, endTime, travelTime, mrn and driverID")).end()
        return
    }

    //Check if driver exists
    db.query('SELECT * FROM driver WHERE driverID = ?', [driverID], function (error, rows, fields) {
        if (!rows[0]) {
            res.status(401).json(new ApiResponse(401, "Driver does not exist")).end()
            return
        } else {

            // Execute select user query
            let query = {
                sql: 'INSERT INTO `drive_times`(startTime, endTime, travelTime, mrn, driverID) VALUES (?,?,?,?,?)',
                values: [startTime, endTime, travelTime, mrn, driverID],
                timeout: 3000
            }
            db.query(query, function (error, result) {

                // Handle Mysql Errors
                if (error) {
                    res.status(500).json(new ApiResponse(500, error)).end()
                } else {
                    res.status(200).json(new ApiResponse(200, "Succesfully added drive times")).end()
                }
            })
        }
    })
}

function getDriveTimeID(req, res) {
    console.log('GET getDriveTimeID function called')

    let driverID = req.params.id;

    //Check if param exists
    if (!driverID) {
        res.status(412).json(new ApiResponse(412, "Missing Parameters, check if driverID is missing")).end()
        return
    }

    //Check if param is filled in
    if (driverID == '') {
        res.status(412).json(new ApiResponse(412, "Missing Parameters, check if driverID is missing")).end()
        return
    }

    //Check if driveTime exists for this MRN
    db.query('SELECT * FROM drive_times WHERE driverID = ?', [driverID], function (error, rows, fields) {
        if (!rows[0]) {
            res.status(401).json(new ApiResponse(401, "There are no drivetimes for this driver")).end()
            return
        } else {
            db.query('SELECT * FROM drive_times WHERE driverID = ?', [driverID], function (error, rows, fields) {
                if (error) {
                    res.status(500).json(new ApiResponse(500, error)).end()
                } else {
                    res.statu(200).json(new ApiResponse(200, rows)).end()
                }

            })
        }
    })
}

module.exports = {
    sendDriveTimes,
    getDriveTimeID
}