var mrnCollection = require('../data/mrn.json')
const fs = require('fs')

// Pushes the object to the JSON
var putObject = (req, res) => {
	console.log('putObject called')

	var driverID = req.body.driverID
	var mrn = req.body.mrn
	var status = req.body.status
	var reference = req.body.reference
	var dateTime = req.body.dateTime
	var sender = req.body.sender
	var receiver = req.body.receiver
	var client = req.body.client
	var amount = req.body.amount
	var total = req.body.total
	var currency = req.body.currency
	var weight = req.body.weight

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
	

	fs.readFile("./data/mrn.json", 'utf-8', function (err, data) {
		if (err) {
			console.log(err)
		}
		if (typeof data !== "undefined") {
			var dataSet = JSON.parse(data)

			dataSet.forms.push(form)

			fs.writeFile("./data/mrn.json", JSON.stringify(dataSet, null, 4), function (err) {
				if (err) {
					res.json(err).status(200)
				} else {
					res.json({"msg": "Added"}).status(200)
				}
			})

		}
	})
}

// Gets the form with the driver ID
var getObject = (req, res) => {
	var result
	for (i = 0; i < mrnCollection.forms.length; i++) {
		if (mrnCollection.forms[i]['driverID'] == req.params.id) {
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