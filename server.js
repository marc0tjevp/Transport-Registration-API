// Require
var express = require('express')
var app = express()
var createError = require('http-errors')
var bodyParser = require('body-parser')

// Database
var db = require('./database/database')

// Route Files
let company_routes = require('./routes/company_routes')
let customs_routes = require('./routes/customs_routes')
let authentication_routes = require('./routes/authentication_routes')

// Use Body Parser to get properties from body in posts
app.use(bodyParser.json())

// Hello World!
app.get('/', function (req, res) {
    res.send('Hello World')
})

// Routes
app.use('/company', company_routes)
app.use('/auth', authentication_routes)
app.use('/customs', customs_routes)

// Listen
var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Listening on port " + port)
})

module.exports = server