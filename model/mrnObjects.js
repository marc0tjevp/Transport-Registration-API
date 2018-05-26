
var mrnCollection = []

var testObjectOne = {
    "Id": "1",
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
var testObjectTwo = {
    "Id": "2",
	"Mrn" : "1234ABCD",
	"Status":"AllGoodGood",
	"Reference":"Referentiez",
	"DateTime":"27Mei",
	"Afzender":"amazon.com",
	"Ontvanger":"Klant2",
	"Opdrachtgever":"Keesje",
	"AantalArtikelen":"4",
	"Totaalbedrag":"40.00",
	"Currency":"BTC",
	"TotaalGewicht":"200kilo"
}

mrnCollection.push(testObjectOne)
mrnCollection.push(testObjectTwo)

var putObject= (req,res)=>{
    console.log('Put in Array called')
    mrnCollection.push(req)
}

var getObject = (req,res)=>{
    console.log('getObject function called')
    console.log(req.params.id)
    // var result= mrnCollection.find(x => x.Id == req.params.Id)
    var result
    for(i=0;i<mrnCollection.length;i++){
        if(mrnCollection[i]['Id']== req.params.id){
            result = mrnCollection[i]
        }
    }
    console.log(result)
    res.send(JSON.stringify(result))
}

// var getAllObjects = (req,res)=>{
//     res.send(mrnCollection[0])
// }

module.exports = {
    putObject,
    getObject
    // getAllObjects
}
