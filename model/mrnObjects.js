
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

var putObject= function(param){
    console.log('Put in Array called')
    mrnCollection.push(param)
}

var getObject = function(param){
    console.log('getObject function called')
    return mrnCollection[0]
}

// var getAllObjects = (req,res)=>{
//     res.send(mrnCollection[0])
// }

module.exports = {
    putObject,
    getObject
    // getAllObjects
}
