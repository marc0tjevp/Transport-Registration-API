let routes = require('express').Router()
let controller = require('../controller/company_controller')

/**
 * Returns all forms that are assigned to the user, with the exception of forms with status 8 and 13
 * @route GET /company/driver/get
 * @group Company - Routes used by the company
 * @param {id} userID.required - The userID is extracted from the JWT token
 * @returns {ApiResponse.model} 419 - Missing Parameters, check if userID is missing
 * @returns {ApiResponse.model} 200 - An array of forms per driver
 * @returns {ApiResponse.model} 500 - Unexpected error
 */
routes.get('/driver/get', controller.getFormsByDriver)

/**
 * Register a driver to an existing MRN
 * @route POST /company/driver/register
 * @group Company - Routes used by the company
 * @param {int} driverID.required - The driverID is used to connect the cargo and the driver
 * @param {string} mrn.required - The MRN is used to check if the cargo exists, if it does it gets connected to the driver
 * @returns {ApiResponse.model} 200 - Registered driver to form
 * @returns {ApiResponse.model} 419 - Missing Paramters, check if driverID or mrn is missing
 * @returns {ApiResponse.model} 404 - A form with this MRN does not exists
 * @returns {ApiResponse.model} 404 - Driver does not exist
 * @returns {ApiResponse.model} 409 - MRN is already registered to a driver
 * @returns {ApiResponse.model} 500 - Unexpected error
 */
routes.post('/driver/register', controller.registerDriver)

/**
 * Remove a driver from an already assigned MRN
 * @route POST /company/driver/unregister
 * @group Company - Routes used by the company
 * @param {int} driverID.required - The driverID is used to connect the cargo and the driver
 * @param {string} mrn.required - The MRN is used to check if the cargo exists, if it does it gets connected to the driver
 * @returns {ApiResponse.model} 200 - Removed driver from form
 * @returns {ApiResponse.model} 419 - Missing Paramters, check if driverID or mrn is missing
 * @returns {ApiResponse.model} 500 - Unexpected error
 */
routes.delete('/driver/deregister', controller.deregisterDriver)

/**
 * Get all registered forms
 * @route GET /company/forms
 * @group Company - Routes used by the company
 * @returns {ApiResponse.model} 200 - An array of forms
 * @returns {ApiResponse.model} 500 - Unexpected error
 */
routes.get('/forms', controller.getAllRegisteredForms)

/**
 * Get all registered form by ID, from JWT Token
 * @route GET /company/getbyid/:id
 * @group Company - Routes used by the company
 * @returns {ApiResponse.model} 200 - An array of forms
 * @returns {ApiResponse.model} 500 - Unexpected error
 */
routes.get('/getbyid/:id', controller.getFormsByDriverURL)

module.exports = routes