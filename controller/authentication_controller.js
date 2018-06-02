const auth = require('../authentication/authentication')
const db = require('../database/database')

function login(req, res) {

    // Get parameters from body
    var username = req.body.username || ''
    var password = req.body.password || ''
    var imei = req.body.imei || ''

    // Check if all parameters exist in body
    if (!password || !username || !imei) {
        res.status(412).json({
            "status":"412",
            "msg": "please provide a username, password and IMEI to login"
        })
        return
    }

    // Check if all paramaters are filled in
    if (password == '' || username == '' || imei == '') {
        res.status(412).json({
            "status":"412",
            "msg": "please provide a username, password and IMEI to login"
        })
        return
    }

    //Check if username exists
    db.query('SELECT * FROM user WHERE username = ?', [username], function (error, rows, fields){
        if(!rows[0]){
            res.status(401).json({
                "status":"401",
                "msg": "Username does not exist"
            })
        }
    })

    // Execute select user query
    db.query('SELECT userID, username, password, imei FROM user WHERE username = ?', [username], function (error, rows, fields) {

        // Handle Mysql Errors
        if (error) {
            res.status(500).json(error)
        }

        // Check if credentials match
        if (username == rows[0].username && password == rows[0].password && imei == rows[0].imei) {

            let token = auth.encodeToken(rows[0].userID)

            console.log(rows[0])

            res.status(200).json({
                "token": token,
                "status": 200
            })

        } else{
            res.status(401).json({
                "status":"401",
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
        timeout: 3000
    }

    // Insert User query
    var queryUser = {
        sql: 'INSERT INTO `user`(username, password, imei) VALUES (?, ?, ?)',
        values: [username, password, imei],
        timeout: 3000
    }

    // Check if all parameters exist in body
    if (!password || !username || !firstname || !lastname || !imei) {
        res.status(412).json({
            "status":"412",
            "msg": "please provide a username, password, firstname, lastname and IMEI to register"
        })
        return
    }

    // Check if all paramaters are filled in
    if (password == '' || username == '' || firstname == '' || lastname == '' || imei == '') {
        res.status(412).json({
            "status":"412",
            "msg": "please provide a username, password, firstname, lastname and IMEI to register"
        })
        return
    }

    //Check parameter's length
    if(username.length <2 || firstname.length <2 || lastname.length <2 || password.length <2){
        res.status(412).json({
            "status":"412",
            "msg": "Register credentials have to be 2 characters or more"
        })
        return
    }

    // Check if username already exists
    db.query(queryCheckUsername, function (error, rows, fields) {

        // If there is a result, the username exists
        if (rows[0]) {
            res.status(409).json({
                "status": "409",
                "msg": "username is already taken"
            })
            return
        } else {

            // Insert new driver first
            db.query(queryUser, function (error, result) {

                // Handle MySQL Errors
                if (error) {
                    res.json({
                        "msg": error
                    })
                    return
                } else {

                    // Get ID from just inserted driver
                    var resultID = result.insertId

                    // Insert Driver Query
                    var queryDriver = {
                        sql: 'INSERT INTO `driver`(firstname, lastname, userID) VALUES (?,?, ?)',
                        values: [firstname, lastname, resultID],
                        timeout: 3000
                    }

                    // Insert new user with driverID from previous query
                    db.query(queryDriver, function (error, result) {
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