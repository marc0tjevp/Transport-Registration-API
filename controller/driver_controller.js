const drivetime = require('../model/DriveTime')
const db = require('../database/database')

function sendDriveTimes(req,res){

    //Get params from body
    var startTime = req.body.startTime;
    var endTime = req.body.endTime;
    var mrn = req.body.mrn;
    var driverID = req.body.driverID;

    //Check if params exist
    if (!startTime || !endTime || !mrn || !driverID) {
        res.status(412).json({
            "status":"412",
            "msg": "Please make sure to insert startTime,endTime, mrn and driverID"
        })
        return
    }

    // Check if all paramaters are filled in
    if (startTime == '' || endTime == '' || mrn == '' || driverID == '') {
        res.status(412).json({
            "status":"412",
            "msg": "please provide a username, password and IMEI to login"
        })
        return
    }

    //Check if driver exists
    db.query('SELECT * FROM driver WHERE driverID = ?', [driverID], function (error, rows, fields){
        if(!rows[0]){
            res.status(401).json({
                "status":"401",
                "msg": "Driver does not exist"
            })
            return
        }
    })

        // Execute select user query
        var query = {
            sql: 'INSERT INTO `drive_times`(startTime, endTime, mrn, driverID) VALUES (?,?,?,?)',
            values: [startTime, endTime, mrn, driverID],
            timeout: 3000
        }
        db.query(query, function (error, result) {

            // Handle Mysql Errors
            if (error) {
                res.status(500).json({
                    "message": "SQL error occured",
                    "error" : error
                })  
            } else {
                res.status(200).json({
                    "Message": "Succesfully added drive times",
                    "result: ": result
                })
            }
        })

}

module.exports = {
    sendDriveTimes
}