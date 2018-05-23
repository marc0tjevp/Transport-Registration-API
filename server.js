var express = require('express')
var app = express()
var createError = require('http-errors')

app.get('/', function (req, res) {
    res.send('Hello World')
})

var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Listening on port " + port)
})
