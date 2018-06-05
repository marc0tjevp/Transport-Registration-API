let routes = require('express').Router()
let auth = require('../controller/authentication_controller')

/**
 * Login to the API with username, password and GUID
 * @route POST /auth/login
 * @group Authentication
 * @param {string} username.required - Username of the user
 * @param {string} password.required - Password of the user
 * @param {string} imei.required - The GUID of the users device
 * @returns {object} 200 - "token": token
 * @returns {object} 412 - "msg": "please provide a username, password and IMEI to login"
 * @returns {object} 401 - "msg": "Username does not exist"
 * @returns {object} 401 - "msg": "No valid credentials or imei is incorrect"
 * @returns {object}  500 - Unexpected error
 */
routes.post('/login', auth.login)

/**
 * Creates a user and driver
 * @route POST /auth/register
 * @group Authentication
 * @param {string} username.required - Username of the user
 * @param {string} password.required - Password of the user
 * @param {string} firsname.required - Firstname of the user
 * @param {string} lastname.required - Lastname of the user
 * @param {string} imei.required - The GUID of the users device
 * @returns {object} 200 - "token": token
 * @returns {object} 412 - "msg": "please provide a username, password, firstname, lastname and IMEI to register"
 * @returns {object} 412 - "msg": "Register credentials have to be 2 characters or more"
 * @returns {object} 409 - "msg": "username is already taken"
 * @returns {object} 500 - Unexpected error
 */
routes.post('/register', auth.register)

module.exports = routes