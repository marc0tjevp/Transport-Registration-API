const auth = require('../authentication/authentication')
const db = require('../database/database')

function login(req, res) {

    // Get parameters from body
    var username = req.body.username || ''
    var password = req.body.password || ''
    var imei = req.body.imei || ''

    // Check if all parameters exist in body
    if (!password || !username || !imei) {
        res.json({
            "msg": "please provide a username, password and IMEI to login"
        })
        return
    }

    // Check if all paramaters are filled in
    if (password == '' || username == '' || imei == '') {
        res.json({
            "msg": "please provide a username, password and IMEI to login"
        })
        return
    }

    // Execute select user query
    db.query('SELECT username, password, imei FROM user WHERE username = ?', [username], function (error, rows, fields) {

        // Handle Mysql Errors
        if (error) {
            res.status(500).json(error)
        }

        // Check if credentials match
        if (username == rows[0].username && password == rows[0].password && imei == rows[0].imei) {
            let token = auth.encodeToken(username)
            console.log('Token: ' + token + " entry: " + req.body.username + req.body.password + req.body.imei)
            res.status(200).json({
                "token": token,
                "status": 200
            })
        } else {
            res.json({
                "msg": "No valid credentials or imei is incorrect"
            })
        }
    })

}

function register(req, res) {

    // Get parameters from body
    var username = req.body.username || ''
    var password = req.body.password || ''
    var firstname = req.body.firstname || ''
    var lastname = req.body.lastname || ''
    var imei = req.body.imei || ''

    // Check Username Query
    var queryCheckUsername = {
        sql: 'SELECT username from user WHERE username = ?',
        values: [username],
        timeout: 300
    }

    // Insert Driver Query
    var queryDriver = {
        sql: 'INSERT INTO `driver`(firstname, lastname) VALUES (?,?)',
        values: [firstname, lastname],
        timeout: 3000
    }

    // Check if all parameters exist in body
    if (!password || !username || !firstname || !lastname || !imei) {
        res.json({
            "msg": "please provide a username, password, firstname, lastname and IMEI to register"
        })
        return
    }

    // Check if all paramaters are filled in
    if (password == '' || username == '' || firstname == '' || lastname == '' || imei == '') {
        res.json({
            "msg": "please provide a username, password, firstname, lastname and IMEI to register"
        })
        return
    }

    // Check if username already exists
    db.query(queryCheckUsername, function (error, rows, fields) {

        // If there is a result, the username exists
        if (rows[0]) {
            res.json({
                "msg": "username is already taken"
            })
            return
        } else {

            // Insert new driver first
            db.query(queryDriver, function (error, result) {

                // Handle MySQL Errors
                if (error) {
                    res.json({
                        "msg": error
                    })
                    return
                } else {

                    // Get ID from just inserted driver
                    var resultID = result.insertId

                    var queryUser = {
                        sql: 'INSERT INTO `user`(username, password, driverID, imei) VALUES (?, ?, ?, ?)',
                        values: [username, password, resultID, imei],
                        timeout: 3000
                    }

                    // Insert new user with driverID from previous query
                    db.query(queryUser, function (error, result) {
                        if (!error) {
                            res.json({
                                "msg": "registered new user"
                            })
                        } else {
                            res.json({
                                "msg": error
                            })
                        }
                    })
                }
            })
        }
    })
}

module.exports = {
    login,
    register
}