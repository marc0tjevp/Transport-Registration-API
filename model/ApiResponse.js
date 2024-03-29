/**
 * @typedef ApiResponse
 * @property {string} message.required
 * @property {string} status.required
 */
class ApiResponse {

    constructor(status, message) {
        this.status = status
        this.message = message
        this.datetime = new Date().toISOString()
    }

}

module.exports = ApiResponse