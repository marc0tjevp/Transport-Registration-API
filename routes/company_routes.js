let routes = require('express').Router()

routes.get('bedrijf/driver')

routes.post('/bedrijf/driver/:id/location')

routes.get('/bedrijf/driver/:id/route')

routes.get('/bedrijf/driver/:id')

routes.post('/bedrijf/driver/:id')

routes.post('/bedrijf/login')

routes.post('/bedrijf/register')