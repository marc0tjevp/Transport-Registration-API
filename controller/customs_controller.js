const http = require('http')
const ApiResponse = require('../model/ApiResponse')

module.exports = {
    getMRNFormFromMockserver(req, res, next) {
        let mrn = req.params.mrn || ''

        if (!mrn || mrn == '') {
            res.status(419).json(new ApiResponse(419, "Missing Parameters, check if mrn is missing"))
            return
        }

        http.get(
                {
                    hostname: 'localhost',
                    port: 8082,
                    path: '/mrn-form/' + mrn,
                    method: 'GET',
                    agent: false,
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': 'edaskjerds4234i'
                    }
                }, (resp) => {
                    let data = ''

                    // gets all data
                    resp.on('data', (chunk) => {
                        data += chunk;
                    })

                    // The whole response has been received. Print out the result.
                    resp.on('end', () => {
                        res.status(resp.statusCode).json(new ApiResponse(resp.statusCode, JSON.parse(data))).end()
                    })

                })

            .on("error", (err) => {
                res.status(500).json(new ApiResponse(500, err)).end()
            })
    },

    sendFreightReadyToMockserver(req, res, next) {
        let mrn = req.params.mrn

        if (!mrn || mrn == '') {
            res.status(419).json(new ApiResponse(419, "Missing Parameters, check if mrn is missing"))
            return
        }

        http.get(
                //object with all connection options
                {
                    hostname: 'localhost',
                    port: 8082,
                    path: '/status-request/' + mrn,
                    method: 'GET',
                    agent: false,
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': 'edaskjerds4234i'
                    }
                }, (resp) => {

                    let data = '';

                    // gets all data
                    resp.on('data', (chunk) => {
                        data += chunk;
                    })

                    // The whole response has been received. Print out the result.
                    resp.on('end', () => {
                        res.status(resp.statusCode).json(new ApiResponse(resp.statusCode, JSON.parse(data))).end()
                    })

                })
            .on("error", (err) => {
                res.status(500).json(new ApiResponse(500, err)).end()
            })
    }
}