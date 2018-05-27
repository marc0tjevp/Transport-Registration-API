var mrnCollection = require('../data/mrn.json')

// Pushes the object to the JSON
var putObject = (req, res) => {

	var driverID = request.body.driverID
	var mrn = request.body.mrn
	var status = request.body.status
	var reference = request.body.reference
	var dateTime = request.body.dateTime
	var sender = request.body.sender
	var receiver = request.body.receiver
	var client = request.body.client
	var amount = request.body.amount
	var total = request.body.total
	var currency = request.body.currency
	var weight = request.body.weight

	var form = {
		"driverID": driverID,
		"mrn": mrn,
		"status": status,
		"reference": reference,
		"dateTime": dateTime,
		"sender": sender,
		"receiver": receiver,
		"client": client,
		"amount": amount,
		"total": total,
		"currency": currency,
		"weight": weight
	}
	

	fs.readFile("../data/mrn.json", 'utf-8', function (err, data) {
		if (err) {
			console.log(err)
		}
		if (typeof data !== "undefined") {
			var dataSet = JSON.parse(data)

			dataSet.forms.push(form)

			fs.writeFile("./data/messages.json", JSON.stringify(dataSet, null, 4), function (err) {
				response.json(err)
			})

			var reply = {
				"msg": "Added form"
			}

			response.json(reply).status(200)
		}
	})
}

// Gets the form with the driver ID
var getObject = (req, res) => {
	var result
	for (i = 0; i < mrnCollection.forms.length; i++) {
		if (mrnCollection.forms[i]['Id'] == req.params.id) {
			result = mrnCollection.forms[i]
		}
	}
	res.json(result).status(200)
}

module.exports = {
	putObject,
	getObject
	// getAllObjects
}