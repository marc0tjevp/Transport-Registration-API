var express = require('express')
var app = express()
var createError = require('http-errors')
var bodyParser = require('body-parser')

let company_routes=require('./routes/company_routes')

app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.use('/api/mrn', company_routes)

var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Listening on port " + port)
})

module.exports = server
