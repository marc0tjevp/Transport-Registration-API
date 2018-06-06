const drivetime = require('../model/DriveTime')
const db = require('../database/database')

function sendDriveTimes(req,res){
    console.log('sendDriveTimes function called')

    //Get params from body
    let startTime = req.body.startTime;
    let endTime = req.body.endTime;
    let mrn = req.body.mrn;
    let driverID = req.body.driverID;

    //Check if params exist
    if (!startTime || !endTime || !mrn || !driverID) {
        res.status(412).json({
            "status":"412",
            "msg": "Please make sure to insert startTime,endTime, mrn and driverID"
        })
        res.end()
        return
    }

    // Check if all paramaters are filled in
    if (startTime == '' || endTime == '' || mrn == '' || driverID == '') {
        res.status(412).json({
            "status":"412",
            "msg": "please provide a username, password and IMEI to login"
        })
        res.end()
        return
    }

    //Check if driver exists
    db.query('SELECT * FROM driver WHERE driverID = ?', [driverID], function (error, rows, fields){
        if(!rows[0]){
            res.status(401).json({
                "status":"401",
                "msg": "Driver does not exist"
            })
            res.end()
            return
        }
    })

        // Execute select user query
        let query = {
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
                res.end() 
            } else {
                res.status(200).json({
                    "Message": "Succesfully added drive times",
                    "result: ": result
                })
                res.end()
            }
        })

}

function getDriveTimeID(req,res){
    console.log('getDriveTimeID function called')

    let driverID = req.body.driverID;

    //Check if param exists
    if(!driverID){
        res.status(412).json({
            "status":"412",
            "msg": "Please make sure driverID is filled in"
        })
        res.end()
        return
    }

    //Check if param is filled in
    if(driverID == ''){
        res.status(412).json({
            "status":"412",
            "msg": "Please make sure driverID is filled in"
        })
        res.end()
        return
    }

    //Check if driveTime exists for this MRN
    db.query('SELECT * FROM drive_times WHERE driverID = ?', [driverID], function (error, rows, fields){
        if(!rows[0]){
            res.status(401).json({
                "status":"401",
                "msg": "drive times for this driverID does not exist"
            })
            res.end()
            return
        }
    })

    db.query('SELECT * FROM drive_times WHERE driverID = ?',[driverID], function(error,rows,fields){
        if(error){
            res.status(400).json({
                "Message": "An error occured in the SQL query",
                "Error: ": error
            })
            res.end()
        } else {
            res.status(200).json(rows)
            res.end()
        }
        
    })

}

module.exports = {
    sendDriveTimes,
    getDriveTimeID
}