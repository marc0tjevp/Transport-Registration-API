const db = require('../database/database')
const auth = require('../authentication/authentication')
const ApiResponse = require('../model/ApiResponse')

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

    if (!userID || !username || !password || !imei || !firstname || !lastname) {
        res.status(412).json(new ApiResponse(412, "Missing parameters, check if userId, username, password, imei, firstname or lastname is missing")).end()
        return
    }


    var query = {
        sql: 'UPDATE user SET username = ?, password = ?, imei = ? WHERE userID = ?',
        values: [username, password, imei, userID],
        timeout: 3000
    }

    var queryTwo = {
        sql: 'UPDATE driver SET firstname = ?, lastname = ? WHERE userID = ?',
        values: [firstname, lastname, userID],
        timeout: 3000
    }

    db.query(query, (err, response, fields) => {
        if (err) {
            res.status(500).json(new ApiResponse(500, err)).end()
        } else {
            db.query(queryTwo, (err, response, fields) => {
                if (err) {
                    res.status(500).json(new ApiResponse(500, err)).end()
                } else {
                    res.status(200).json(new ApiResponse(200, "Edit succesfull")).end()
                }
            })
        }
    })

    // db.query('SELECT * FROM driver WHERE userID = ?', [userID], function (error, rows, fields) {
    //     res.status(500).json(new ApiResponse(500, error)).end()
    // })

    // db.query('SELECT * FROM user WHERE userID = ?', [userID], function (error, rows, fields) {
    //     if (!error) {
    //         res.status(200).json(new ApiResponse(200, "Edit succesfull")).end()
    //     } else {
    //         res.status(500).json(new ApiResponse(500, error)).end()
    //     }
    // })

}

//Delete user by ID, only deletes if username/password/id match
function deleteUser(req, res) {
    console.log('deleteUser function called')

    var userID = req.body.userID || ''

    if (!userID || userID == '') {
        res.status(412).json(new ApiResponse(412, "Please provide a userID")).end()
        return
    }

    db.query('SELECT * FROM user WHERE userID = ?', [userID], function (error, rows, fields) {

        // Handle Mysql Errors
        if (error) {
            res.status(500).json(new ApiResponse(500, err)).end()
        }

        var query = {
            sql: 'DELETE FROM user WHERE userID = ?',
            values: userID,
            timeout: 3000
        }

        db.query(query, (err, response, fields) => {
            if (err) {
                res.status(500).json(new ApiResponse(500, err)).end()
            }
            res.status(200).json(new ApiResponse(200, "Succesfully deleted user")).end()
        })
    })


}

// function editDriver(req, res) {
//     console.log('editDriver function called')

//     var userID = req.body.userID || ''
//     var firstname = req.body.firstname || ''
//     var lastname = req.body.lastname || ''

//     if (userID === "" || firstname === "" || lastname === "") {
//         res.status(412).json(new ApiResponse(412, "Missing parameters, check if userID, firstname or lastname is missing")).end()
//         return
//     }

//     db.query('SELECT * FROM driver WHERE userID = ?', [userID], function (error, rows, fields) {
//         if (!rows[0]) {
//             res.status(412).json(new ApiResponse(412, "No user found with this ID")).end()
//         } else {
//             console.log(rows)
//             var query = {
//                 sql: 'UPDATE driver SET firstname = ?, lastname = ? WHERE userID = ?',
//                 values: [firstname, lastname, userID],
//                 timeout: 3000
//             }
//             db.query(query, (err, response, fields) => {
//                 if (err) {
//                     console.log('error occured in editDriver query')
//                     res.status(500).json(new ApiResponse(500, err)).end()
//                 }
//             })
//             db.query('SELECT * FROM driver WHERE userID = ?', [userID], function (error, rows, fields) {
//                 console.log(rows)
//             })
//             res.status(200).json(new ApiResponse(200, "Edit succesfull")).end()
//         }
//     })


// }

function editImei(req, res) {
    console.log('editImei function called')

    var userID = req.body.userID || ``
    var imei = req.body.imei || ``

    if (!userID || !imei) {
        res.status(412).json(new ApiResponse(412, "Missing parameters, check if userID or imei is missing")).end()
        return
    }

    if (userID == '' || imei == '') {
        res.status(412).json(new ApiResponse(412, "Missing parameters, check if userID or imei is missing")).end()
        return
    }

    var query = {
        sql: 'UPDATE user SET imei = ? WHERE userID = ?',
        values: [imei, userID],
        timeout: 3000
    }

    db.query(query, (err, response, fields) => {
        if (err) {
            console.log('error occured in editImei query')
            res.status(500).json(new ApiResponse(500, err)).end()
        }
        res.status(200).json(new ApiResponse(200, "Edit Succesfull")).end()
    })

}

function getAllUsers(req, res) {
    db.query('SELECT user.userID, driver.driverID, user.username, driver.firstname, driver.lastname, user.imei FROM user INNER JOIN driver ON user.userID = driver.userID', function (error, rows, fields) {
        res.status(200).json(new ApiResponse(200, rows)).end()
    })
}

function getUserByDriverID(req, res) {

    var driverID = req.params.id

    db.query('SELECT user.userID, driver.driverID, user.username, driver.firstname, driver.lastname, user.imei FROM user INNER JOIN driver ON user.userID = driver.userID WHERE driverID = ?', [driverID], function (error, rows, fields) {
        res.status(200).json(new ApiResponse(200, rows[0])).end()
    })
}

module.exports = {
    editUser,
    deleteUser,
    // editDriver,
    editImei,
    getAllUsers,
    getUserByDriverID
}