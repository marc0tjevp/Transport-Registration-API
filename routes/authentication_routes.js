let routes = require('express').Router()
let auth = require('../controller/authentication_controller')

/**
 * Login to the API with username, password and GUID
 * @route POST /auth/login
 * @group Authentication
 * @param {string} username.required - Username of the user
 * @param {string} password.required - Password of the user
 * @param {string} imei.required - The GUID of the users device
 * @returns {ApiResponse.model} 200 - JWT Token
 * @returns {ApiResponse.model} 412 - Missing paramaters, check if username, password and imei are missing
 * @returns {ApiResponse.model} 401 - Username does not exist
 * @returns {ApiResponse.model} 401 - No valid credentials or imei is incorrect
 * @returns {ApiResponse.model} 500 - Unexpected error
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
 * @returns {ApiResponse.model} 200 - User has been registered
 * @returns {ApiResponse.model} 412 - Missing parameters, check if username, password, firstname, lastname or imei is missing
 * @returns {ApiResponse.model} 412 - Register credentials have to be 2 characters or more
 * @returns {ApiResponse.model} 409 - Username is already taken
 * @returns {ApiResponse.model} 500 - Unexpected error
 */
routes.post('/register', auth.register)

module.exports = routes