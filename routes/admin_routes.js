let routes = require('express').Router()
let auth = require('../controller/admin_controller')

routes.post('/edituser', auth.editUser)
routes.post('/deleteuser', auth.deleteUser)

module.exports = routes