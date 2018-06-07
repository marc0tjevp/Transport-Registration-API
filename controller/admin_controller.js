const db = require('../database/database')
const auth = require('../authentication/authentication')

//Edits user by ID, fill any other value with new value to update
//If some values need to go unchanged, enter the old values
function editUser(req, res) {
    console.log('editUser function called')

    var userID = req.body.userID || ''
    var username = req.body.username || ''
    var password = req.body.password || ''
    var imei = req.body.imei || ''
    var firstname = req.body.firstname || ''
    var lastname = req.body.lastname || ''

    if(!userID || !username || !password || !imei ||!firstname || !lastname){
        res.json({
            "message": "Missing parameters"
        })
        res.end()
        return
    }


    db.query('SELECT * FROM user WHERE userID = ?', [userID], function (error, rows, fields) {
        console.log(rows)
    })

        var query ={
            sql: 'UPDATE user SET username = ?, password = ?, imei = ? WHERE userID = ?',
            values: [username, password, imei, userID],
            timeout : 3000
        }
        db.query(query,(err,response,fields)=>{
            if(err){
                console.log('error occured in editUser query')
                res.json({
                    error: err
                })
                res.end()
            }
        })

    db.query('SELECT * FROM driver WHERE userID = ?',[userID], function(errorTwo, rowsTwo,fieldsTwo){
        console.log(rowsTwo)
    })

        var queryTwo ={
            sql: 'UPDATE driver SET firstname = ?, lastname = ? WHERE userID = ?',
            values: [firstname, lastname, userID],
            timeout : 3000
        }
        db.query(queryTwo,(err,response,fields)=>{
            if(err){
                console.log('error occured in editUser query')
                res.json({
                    "error": err
                })
                res.end()
            }
        })

        db.query('SELECT * FROM driver WHERE userID = ?',[userID], function(error,rows,fields){
            console.log(rows)
            res.json({
                "error": error
            })
            res.end()
        })

    db.query('SELECT * FROM user WHERE userID = ?', [userID], function (error, rows, fields) {
        console.log(rows)
        res.json({
            "message": "edit succesful"
        })
    })
    res.status(200)
    res.end()
}

//Delete user by ID, only deletes if username/password/id match
function deleteUser(req, res) {
    console.log('deleteUser function called')

    var userID = req.body.userID || ''

    if(!userID || userID == ''){
        res.status(412).json({
            "message": "Please make sure to give userID",
            "status":"412"
        })
        res.end()
        return
    }
    
    db.query('SELECT * FROM user WHERE userID = ?', [userID], function (error, rows, fields) {

        // Handle Mysql Errors
        if (error) {
            res.status(500).json(error)
            res.end()
        }

        console.log(rows)

            var query = {
                sql: 'DELETE FROM user WHERE userID = ?',
                values : userID,
                timeout : 3000
            }
        db.query(query,(err,response,fields)=>{
            if(err){
                res.status(400).json({
                    "error": err
                })
                res.end()
            }res.status(200).json({
                "message": "Succesfully deleted user"
            })
            res.end()
            
        })
    })


}

function editDriver(req, res) {
    console.log('editDriver function called')

    var userID = req.body.userID || ''
    var firstname = req.body.firstname || ''
    var lastname = req.body.lastname || ''

    if (userID === "" || firstname === "" || lastname === "") {
        res.json({
            "message": "No parameters"
        })
        res.end()
        return
    }


    db.query('SELECT * FROM driver WHERE userID = ?', [userID], function (error, rows, fields) {
        if (!rows[0]) {
            res.json({
                "Message": "No user found with this ID"
            })
            res.end()
        } else {
            console.log(rows)
            var query = {
                sql: 'UPDATE driver SET firstname = ?, lastname = ? WHERE userID = ?',
                values: [firstname, lastname, userID],
                timeout: 3000
            }
            db.query(query, (err, response, fields) => {
                if (err) {
                    console.log('error occured in editDriver query')
                    res.json({
                        error: err
                    })
                    res.end()
                }
            })
            db.query('SELECT * FROM driver WHERE userID = ?', [userID], function (error, rows, fields) {
                console.log(rows)
            })
            res.json({
                status: 200
            })
            res.end()
        }
    })


}

function editImei(req, res) {
    console.log('editImei function called')

    var userID = req.body.userID || ``
    var imei = req.body.imei || ``

    if (!userID || !imei) {
        res.json({
            "message": "Missing parameters, check if userID or imei is missing"
        })
        res.end()
    }

    db.query('SELECT * FROM user WHERE userID = ?', [userID], function (error, rows, fields) {
        console.log(rows)
    })

    var query = {
        sql: 'UPDATE user SET imei = ? WHERE userID = ?',
        values: [imei, userID],
        timeout: 3000
    }
    db.query(query, (err, response, fields) => {
        if (err) {
            console.log('error occured in editImei query')
            res.json({
                error: err
            })
            res.end()
        }
        console.log('editImei succesfull')
    })
    db.query('SELECT * FROM user WHERE userID = ?', [userID], function (error, rows, fields) {
        console.log(rows)
    })
    res.json({
        status: 200
    })
    res.end()
}

function getAllUsers(req, res) {
    db.query('SELECT user.userID, driver.driverID, user.username, driver.firstname, driver.lastname, user.imei FROM user INNER JOIN driver ON user.userID = driver.userID', function (error, rows, fields) {
        res.json(rows)
        res.end()
    })

}

module.exports = {
    editUser,
    deleteUser,
    editDriver,
    editImei,
    getAllUsers
}