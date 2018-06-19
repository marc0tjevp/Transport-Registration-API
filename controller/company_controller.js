var mrnCollection = require('../data/mrn.json')
const fs = require('fs')
const auth = require('../authentication/authentication')
const Error = require('../model/ApiResponse')
const customs = require('./customs_controller')
const http = require('http')
const db = require('../database/database')
const ApiResponse = require('../model/ApiResponse')

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
		res.status(419).json(new ApiResponse(419, "Missing Paramters, check if driverID or mrn is missing")).end()
	} else {

		http.get({
				hostname: 'localhost',
				port: 8082,
				path: '/form/' + mrn,
				method: 'GET',
				agent: false,
				headers: {
					'Content-Type': 'application/json',
					'x-access-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjE5fQ.cv-MO8XXAjdVbxMaGUfYguhsvnp4FCxk7DBlEv81bZg'
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
								if (errCode == 'ER_NO_REFERENCED_ROW_2') {
									res.status(404).json(new ApiResponse(404, "Driver does not exist")).end()
								} else if (errCode == 'ER_DUP_ENTRY') {
									res.status(409).json(new ApiResponse(409, "MRN is already registered to a driver")).end()
								} else if (error) {
									res.status(500).json(new ApiResponse(500, error)).end()
								}
							} else {
								res.status(200).json(new ApiResponse(200, "Registered driver to form")).end()
							}
						})
					} else {
						res.status(500).json(new ApiResponse(500, "Something went wrong on the mock server")).end()
					}
				})

			})
			.on("error", (err) => {
				res.status(500).json(new ApiResponse(500, err)).end()
			})
	}

}

// Register a driver to a form
var deregisterDriver = (req, res) => {

	var driverID = req.body.driverID || ''
	var mrn = req.body.mrn || ''

	var deleteQuery = {
		sql: 'DELETE FROM cargo_user WHERE mrn = ? AND driverID = ?',
		values: [mrn, driverID],
		timeout: 3000
	}

	if (driverID == '' || mrn == '') {
		res.status(419).json(new ApiResponse(419, "Missing Paramters, check if driverID or mrn is missing")).end()
	} else {
		db.query(deleteQuery, function (error) {
			if (error) {
				res.status(500).json(new ApiResponse(500, err)).end()
			} else {
				res.status(200).json(new ApiResponse(200, "Removed driver from form")).end()
			}
		})
	}
}

// Pushes the object to the JSON
var getFormsByDriver = (req, res) => {

	let tempArray = []

	var token = req.get('Authorization')
	var subtoken = token.substr(7)
	var decodedtoken = auth.decodeToken(subtoken)
	var userID = decodedtoken.sub

	if (userID == '') {
		res.status(419).json(new ApiResponse(419, "Missing Parameters, check if userID is missing")).end()
	}

	var selectQuery = {
		sql: 'SELECT * FROM cargo_user INNER JOIN driver ON cargo_user.driverID = driver.driverID WHERE userID = ?',
		values: [userID],
		timeout: 3000
	}

	db.query(selectQuery, function (error, rows, fields) {
		if (error) {
			res.status(500).json(new ApiResponse(500, error)).end()
		} else {
			rows.forEach(function (row) {
				http.get({
						hostname: 'localhost',
						port: 8082,
						path: '/form/' + row.mrn,
						method: 'GET',
						agent: false,
						headers: {
							'Content-Type': 'application/json',
							'x-access-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjE5fQ.cv-MO8XXAjdVbxMaGUfYguhsvnp4FCxk7DBlEv81bZg'
						}
					}, (resp) => {
						let data = ''

						// gets all data
						resp.on('data', (chunk) => {
							data += chunk;
						})

						// The whole response has been received. Print out the result.
						resp.on('end', () => {
							let newdata = JSON.parse(data)
							if (newdata.declarationStatus == 8) {
								console.log('skipping status 8')
							} else if (newdata.declarationStatus == 13) {
								console.log('skipping status 13')
							} else {
								tempArray.push(row)
								console.log('adding entry because it has status ' + newdata.declarationStatus)
							}
							res.status(200).json(new ApiResponse(200, tempArray)).end()
						})

					})
					.on("error", (err) => {
						res.status(500).json(new ApiResponse(500, err)).end()
					})
			})
		}
	})
}




var getFormsByDriverURL = (req, res) => {

	var driverID = req.params.id

	if (driverID == '') {
		res.status(419).json(new ApiResponse(419, "Missing Parameters, check if userID is missing")).end()
	}

	var selectQuery = {
		sql: 'SELECT * FROM cargo_user WHERE driverID = ?',
		values: [driverID],
		timeout: 3000
	}

	db.query(selectQuery, function (error, rows, fields) {
		if (error) {
			res.status(500).json(new ApiResponse(500, error)).end()
		} else {
			res.status(200).json(new ApiResponse(200, rows)).end()
		}
		console.log(rows)
	})

}

var getAllRegisteredForms = (req, res) => {

	var selectQuery = {
		sql: 'SELECT * FROM cargo_user INNER JOIN driver ON cargo_user.driverID = driver.driverID',
		timeout: 3000
	}

	db.query(selectQuery, function (error, rows, fields) {
		if (error) {
			res.status(500).json(new ApiResponse(500, error)).end()
		} else {
			res.status(200).json(new ApiResponse(200, rows)).end()
		}
	})
}

module.exports = {
	registerDriver,
	getFormsByDriver,
	getAllRegisteredForms,
	deregisterDriver,
	getFormsByDriverURL
}