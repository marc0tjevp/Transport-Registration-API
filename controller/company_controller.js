var mrnCollection = require('../data/mrn.json')
const fs = require('fs')
const auth = require('../authentication/authentication')
const Error = require('../model/ApiError')
const customs = require('./customs_controller')
const http = require('http')
const db = require('../database/database')

// Register a driver to a form
var registerDriver = (req, res) => {


	var driverID = req.body.driverID || ''
	var mrn = req.body.mrn || ''

	var insertQuery = {
		sql: 'INSERT INTO cargo_user(mrn, driverID) VALUES (?, ?)',
		values: [mrn, driverID],
		timeout: 3000
	}

	if (driverID == '' || mrn == '') {
		res.status(419).json({
			"msg": "Please provide a driverID and MRN"
		}).end()
	} else {

		http.get({
				hostname: 'localhost',
				port: 8082,
				path: '/mrn-form/' + mrn,
				method: 'GET',
				agent: false,
				headers: {
					'Content-Type': 'application/json',
					'x-access-token': 'edaskjerds4234i'
				}
			}, (resp) => {
				let data = ''

				// gets all data
				resp.on('data', (chunk) => {
					data += chunk
				})

				resp.on('end', () => {
					var object = JSON.parse(data)
					if (object.mrn == mrn) {
						db.query(insertQuery, function (error) {

							if (error) {
								var errCode = error.code || 'empty'
								console.log(error)
								if (errCode == 'ER_NO_REFERENCED_ROW_2') {
									res.status(404).json({
										"msg": "Driver does not exist"
									}).end()
								} else if (errCode == 'ER_DUP_ENTRY') {
									res.status(409).json({
										"msg": "MRN is already registered to a driver"
									}).end()
								} else if (error) {
									res.json({
										"msg": error
									}).end()
								}
							} else {
								res.json({
									"msg": "Registered Driver to form"
								}).end()
							}
						})
					} else {
						res.status(404).json({
							"msg": "The form with this mrn does not exists"
						}).end()
					}
				})

			})
			.on("error", (err) => {
				res.status(500).json(err).end()
			})
	}

}

// Pushes the object to the JSON
var getFormsByDriver = (req, res) => {

	var token = req.get('Authorization')
	var subtoken = token.substr(7)
	var decodedtoken = auth.decodeToken(subtoken)
	var userID = decodedtoken.sub

	if (userID == '') {
		res.status(500).json({
			"msg": "No userID found"
		}).end()
	}

	var selectQuery = {
		sql: 'SELECT * FROM cargo_user INNER JOIN driver ON cargo_user.driverID = driver.driverID WHERE userID = ?',
		values: [userID],
		timeout: 3000
	}

	db.query(selectQuery, function (error, rows, fields) {
		if (error) {
			res.status(500).json({
				"msg": error
			}).end()
		} else {
			res.status(200).json(rows).end()
		}
	})
}

module.exports = {
	registerDriver,
	getFormsByDriver
}