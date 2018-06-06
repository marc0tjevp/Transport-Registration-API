// Require
const express = require('express')
const app = express()
const ApiError = require('./model/ApiError')
const crypto = require('crypto')
const config = require("./config/config")
// Database
const db = require('./db')


// Gives back the declaration if you give it an mrn
app.get("/mrn-form/:mrn", (req, res, next) => {
    let mrn = req.params.mrn || ''

    let token = req.header("x-access-token") || ''
    let apiKey = hash(token) || ''
    console.log(apiKey)
    if (mrn !== '') {
        db.query('SELECT * FROM apiKey WHERE apiKey = ?', [apiKey], function (error, rows, fields) {
            if (error) {
                next(error)
            } else if (rows !== undefined && rows.length > 0) {
                db.query('SELECT * FROM declaration WHERE mrn = ?', [mrn], function (error, rows, fields) {
                    if (error) {
                        next(error)
                    } else if (rows.length > 0) {
                        res.status(200).json(rows[0]).end()
                    } else {
                        next(new ApiError(404, "MRN code not found in database"))
                    }
                })
            } else {
                next(new ApiError(401, "Access denied"))
            }
        })
    }
})

//might be a useless function, because you can also use the mrn-form endpoint
app.get("/status/:mrn", (req, res, next) => {
    let mrn = req.params.mrn || ''

    let token = req.header("x-access-token") || ''
    let apiKey = hash(token) || ''
    console.log(apiKey)
    if (mrn !== '') {
        db.query('SELECT * FROM apiKey WHERE apiKey = ?', [apiKey], function (error, rows, fields) {
            if (error) {
                next(error)
            } else if (rows !== undefined && rows.length > 0) {
                db.query('SELECT declarationStatus FROM declaration WHERE mrn = ?', [mrn], function (error, rows, fields) {
                    if (error) {
                        next(error)
                    } else if (rows.length > 0) {
                        res.status(200).json(rows[0]).end()
                    } else {
                        next(new ApiError(404, "MRN code not found in database"))
                    }
                })
            } else {
                next(new ApiError(401, "Access denied"))
            }
        })
    }
})


//puts the status-request in the database and starts the random status
app.put("/status-request/:mrn", (req, res, next) => {
    let mrn = req.params.mrn || ''

    let token = req.header("x-access-token") || ''
    let apiKey = hash(token) || ''
    console.log(apiKey)
    if (mrn !== '') {
        db.query('SELECT * FROM apiKey WHERE apiKey = ?', [apiKey], function (error, rows, fields) {
            if (error) {
                next(error)
            } else if (rows !== undefined && rows.length > 0) {
                db.query('INSERT INTO request(mrn) VALUES(?)', [mrn], function (error, rows, fields) {
                    if (error) {

                        switch (error.errno) {
                            case 1452: {
                                next(new ApiError(404, "MRN code not found in database"))
                                break
                            }
                            case 1062: {
                                next(new ApiError(404, "Request was already received"))
                                break
                            }
                            default: {
                                next(error)
                                break
                            }
                        }
                    } else {
                        res.status(200).json({
                            result: "Request successful",
                            date: Date()
                        }).end()
                        setStatus(mrn, -1)

                        setTimeout(function() {
                            changeStatus(mrn)
                        }, 1000 * getRandomInt(10));
                    }
                })
            } else {
                next(new ApiError(401, "Access denied"))
            }
        })
    }
})

app.all("*", (req, res) => {
    res.status(404).json({
        error: "Endpoint not found"
    }).end()
})

app.use(function (error, req, res, next) {
    console.dir(error)
    let status = 500
    if (error instanceof ApiError && error.code !== undefined)
        status = error.code
    res.status(status).json({
        message: error
    }).end()
})

// Listen
let server = app.listen(8082, function () {
    let host = server.address().address
    let port = server.address().port

    console.log("Listening on port " + port)
})


function hash(string) {
    return crypto.createHmac('sha256', config.secretkey)
        .update(string)
        .digest('hex')

}

//randomly changes the status to either 8(OK) or 18 (NOT OK)
function changeStatus(mrn) {

    let status = getRandomInt(50);
    if (status < 45) {
        setStatus(mrn, 8)
    } else {
        setStatus(mrn, 18)
        setTimeout(function() {
            changeStatus(mrn)
        }, 1000 * getRandomInt(10))
    }
}

//sets the status of an mrn to the new status
function setStatus(mrn, status) {
    db.query('UPDATE declaration SET declarationStatus = ? WHERE mrn = ?', [status, mrn], function (error, rows, fields) {
        console.log(status);
        if (error)
            console.log(error);
        return error;
    })
}

//generates a random int between 0 and the max
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

module.exports = server