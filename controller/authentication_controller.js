const auth = require('../authentication/authentication')
const db = require('../database/database')

function login(req, res) {

    console.log('login function called')

    var username = req.body.username || ''
    var password = req.body.password || ''
    var imei = req.body.imei || ''

    if (!password || !username) {
        res.json({
            "msg": "nop"
        })
        return
    }

    db.query('SELECT username, password, imei FROM user WHERE username = ?', [username], function (error, rows, fields) {

        // Handle Mysql Errors
        if (error) {
            res.status(500).json(error)
        }

        console.log(rows)

        if (username == rows[0].username && password == rows[0].password && imei == rows[0].imei) {
            let token = auth.encodeToken(username)
            console.log('Token: ' + token + " entry: " + req.body.username + req.body.password + req.body.imei)
            res.status(200).json({
                "token": token,
                "status": 200
            })
        } else {
            res.send('No valid credentials or imei is incorrect')
            console.log('Error login')
        }
    })


}

function register(req, res) {
    console.log('register function called')

    var username = req.body.username || ''
    var password = req.body.password || ''
    var firstname = req.body.firstname || ''
    var lastname = req.body.lastname || ''
    var imei = req.body.imei || ''

    var queryDriver = {
        sql: 'INSERT INTO `driver`(firstname, lastname) VALUES (?,?)',
        values: [firstname, lastname],
        timeout: 3000
    }

    // Insert new driver first
    db.query(queryDriver, function (error, result) {

        if (error) {
            res.json({
                "msg": error
            })
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

module.exports = {
    login,
    register
}