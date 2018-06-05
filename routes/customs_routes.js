let routes = require('express').Router()
let controller = require('../controller/customs_controller')

/**
 * Gets a form from the Dutch Customs
 * @route GET /customs/form/:mrn
 * @group Customs - Mock server that emulates the API of the Dutch Customs
 * @param {string} mrn.required - The MRN is used to get the form
 * @returns {object} 200 - {Form Object}
 * @returns {Error}  500 - Unexpected error
 */
routes.get('/form/:mrn', controller.getMRNFormFromMockserver)

/**
 * Sends a request to the mock server to change the status of the form. Returns a random status
 * @route PUT /customs/status/:mrn
 * @group Customs - Mock server that emulates the API of the Dutch Customs
 * @param {string} mrn.required - The MRN is used to get the form
 * @returns {object} 200 - {Form Object}
 * @returns {Error}  500 - Unexpected error
 */
routes.put('/status/:mrn', controller.sendFreightReadyToMockserver)

module.exports = routes