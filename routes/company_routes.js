let routes = require('express').Router()
let cargo = require('../model/Cargo')
let mrn = require('../model/mrnObjects')

routes.get('bedrijf/driver')

routes.post('/bedrijf/driver/:id/location')

routes.get('/bedrijf/driver/:id/route')

routes.get('/bedrijf/driver/:id', mrn.getObject)

routes.post('/bedrijf/driver/:id', mrn.putObject)

routes.post('/bedrijf/login')

routes.post('/bedrijf/register')

module.exports = routes