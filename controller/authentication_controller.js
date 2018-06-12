const auth = require('../authentication/authentication')
const db = require('../database/database')
const ApiResponse = require('../model/ApiResponse')

function login(req, res) {

    console.log('Login function called')

    // Get parameters from body
    let username = req.body.username || ''
    let password = req.body.password || ''
    let imei = req.body.imei || ''

    // Check if all parameters exist in body
    if (!password || !username || !imei) {
        res.status(412).json(new ApiResponse(412, "Missing paramaters, check if username, password and imei are missing")).end()
        return
    }

    // Check if all paramaters are filled in
    if (password == '' || username == '' || imei == '') {
        res.status(412).json(new ApiResponse(412, "Missing paramaters, check if username, password and imei are missing")).end()
        return
    }

    //Check if username exists
    db.query('SELECT * FROM user WHERE username = ?', [username], function (error, rows, fields) {
        if (!rows[0]) {
            res.status(401).json(new ApiResponse(401, "Username does not exist")).end()
            return
        } else {

            // Execute select user query
            db.query('SELECT userID, username, password, imei FROM user WHERE username = ?', [username], function (error, rows, fields) {

                console.log(rows)
                // Handle Mysql Errors
                if (error) {
                    res.status(500).json(new ApiResponse(500, error)).end()
                    return
                }

                // if(!username || !password|| !imei ){
                //     res.status(401).json({
                //         "status":"401",
                //         "msg": "No valid credentials or imei is incorrect"
                //     })
                //     res.end()
                //     return
                // }


                // Check if credentials match
                if (username == rows[0].username && password == rows[0].password && imei == rows[0].imei) {
                    console.log('In the credentials match' + username + ' ' + password + ' ' + imei)
                    let token = auth.encodeToken(rows[0].userID)

                    res.status(200).json(new ApiResponse(200, token)).end()

                } else {
                    res.status(401).json(new ApiResponse(401, "No valid credentials or incorrect imei")).end()
                }
            })

        }
    })
}

function register(req, res) {

    // Get parameters from body
    let username = req.body.username || ''
    let password = req.body.password || ''
    let firstname = req.body.firstname || ''
    let lastname = req.body.lastname || ''
    let imei = req.body.imei || ''

    console.log(username, password, firstname, lastname, imei)

    // Check Username Query
    let queryCheckUsername = {
        sql: 'SELECT username from user WHERE username = ?',
        values: [username],
        timeout: 3000
    }

    // Insert User query
    let queryUser = {
        sql: 'INSERT INTO `user`(username, password, imei) VALUES (?, ?, ?)',
        values: [username, password, imei],
        timeout: 3000

    }

    // Check if all parameters exist in body
    if (!password || !username || !firstname || !lastname || !imei) {
        res.status(412).json(new ApiResponse(412, "Missing parameters, check if username, password, firstname, lastname or imei is missing")).end()
        return
    }

    // Check if all paramaters are filled in
    if (password == '' || username == '' || firstname == '' || lastname == '' || imei == '') {
        res.status(412).json(new ApiResponse(412, "Missing parameters, check if username, password, firstname, lastname or imei is missing")).end()

        return
    }

    //Check parameter's length
    if (username.length < 2 || firstname.length < 2 || lastname.length < 2 || password.length < 2) {
        res.status(412).json(new ApiResponse(412, "Register credentials have to be 2 characters or more")).end()
        return
    }

    // Check if username already exists
    db.query(queryCheckUsername, function (error, rows, fields) {

        // If there is a result, the username exists
        if (rows[0]) {
            res.status(409).json(new ApiResponse(409, "Username is already taken")).end()
            return
        } else {

            // Insert new driver first
            db.query(queryUser, function (error, result) {

                // Handle MySQL Errors
                if (error) {
                    res.status(500).json(new ApiResponse(500, error)).end()
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
                            res.status(200).json(new ApiResponse(200, "User has been registered")).end()
                        } else {
                            res.status(500).json(new ApiResponse(500, error)).end()
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