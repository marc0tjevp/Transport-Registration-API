var express = require('express')
var app = express()
var createError = require('http-errors')

let company_routes=require('./routes/company_routes')

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.use('/api/mrn', company_routes)


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

module.exports = server
