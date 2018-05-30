let routes = require('express').Router()
let auth = require('../controller/admin_controller')

routes.put('/edituser', auth.editUser)
routes.delete('/deleteuser', auth.deleteUser)
routes.put('/editdriver', auth.editDriver)
routes.put('/editimei', auth.editImei)

module.exports = routes