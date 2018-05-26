
var mrnCollection = []

var testObject = {
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
}

mrnCollection.push(testObject)
console.log(JSON.stringify(mrnCollection))

var putObject= function(req,res){
    console.log('Put in Array called')
    mrnCollection.push(req)
}

var getObject = (req,res)=>{
    console.log('getObject function called')
    res.send(JSON.stringify(mrnCollection))
    res.end()
}

// var getAllObjects = (req,res)=>{
//     res.send(mrnCollection[0])
// }

module.exports = {
    putObject,
    getObject
    // getAllObjects
}
