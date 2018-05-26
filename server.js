var express = require('express')
var app = express()
var createError = require('http-errors')

let mrn = require('./model/mrnObjects')
let cargo = require('./model/Cargo')

app.get('/', function (req, res) {
    res.send('Hello World')
})

// app.get('/bedrijf/driver/:id', mrn.getAllObjects())

// app.post('/bedrijf/driver/:id', mrn.putObject())

app.get('/testObject',(req,res)=>{
    res.send({
        "Mrn" : "123ABC",
        "Status":"AllGood",
        "Reference":"Referentie",
        "DateTime":"26Mei",
        "Afzender":"Bol.com",
        "Ontvanger":"Klant1",
        "Opdrachtgever":"Jantje",
        "AantalArtikelen":"2",
        "Totaalbedrag":"10.00",
        "Currency":"BTC",
        "TotaalGewicht":"100kilo"
    })
})

var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Listening on port " + port)
})
