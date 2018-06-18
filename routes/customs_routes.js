let routes = require('express').Router()
let controller = require('../controller/customs_controller')

/**
 * Gets a form from the Dutch Customs
 * @route GET /customs/form/:mrn
 * @group Customs - Mock server that emulates the API of the Dutch Customs
 * @param {string} mrn.required - The MRN is used to get the form
 * @returns {object} 200 - {Form Object}
 * @returns {ApiResponse.model} 419 - Missing Parameters, check if mrn is missing
 * @returns {ApiResponse.model} 500 - Unexpected error
 */
routes.get('/form/:mrn', controller.getMRNFormFromMockserver)

/**
 * Gets the generated pdf file from the MRN form if the status is 8
 * @route GET /customs/status/:mrn
 * @group Customs - Mock server that emulates the API of the Dutch Customs
 * @param {string} mrn.required - The MRN is used to get the PDF
 * @returns {object} 200 - PDF File, if the status is 8 (STATUS_OK)
 * @returns {ApiResponse.model} 419 - Missing Parameters, check if MRN is missing
 * @returns {ApiResponse.model} 500 - Unexpected error
 */
routes.get('/status/:mrn', controller.getStatusFromMockServer)

routes.get('/form/all/:company', controller.getAllByCompany)

/**
 * Sends a request to the mock server to change the status of the form. Returns a random status
 * @route PUT /customs/status/:mrn
 * @group Customs - Mock server that emulates the API of the Dutch Customs
 * @param {string} mrn.required - The MRN is used to get the form
 * @returns {ApiResponse.model} 200 - {Form Object}
 * @returns {ApiResponse.model} 419 - Missing Parameters, check if mrn is missing
 * @returns {ApiResponse.model} 500 - Unexpected error
 */
routes.put('/status/:mrn', controller.sendFreightReadyToMockserver)

module.exports = routes