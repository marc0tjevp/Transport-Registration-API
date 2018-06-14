const http = require('http')
const ApiResponse = require('../model/ApiResponse')

module.exports = {

    getAllByCompany (req, res, next) {

        let company = req.params.company || ''

        if (!company || company == '') {
            res.status(419).json(new ApiResponse(419, "Missing Parameters, check if company is missing"))
            return
        }

        http.get({
                hostname: 'localhost',
                port: process.env.PORT || 8082,
                path: '/form/all/' + company,
                method: 'GET',
                agent: false,
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjE5fQ.cv-MO8XXAjdVbxMaGUfYguhsvnp4FCxk7DBlEv81bZg'
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

    getMRNFormFromMockserver(req, res, next) {

        let mrn = req.params.mrn || ''

        if (!mrn || mrn == '') {
            res.status(419).json(new ApiResponse(419, "Missing Parameters, check if mrn is missing"))
            return
        }

        http.get({
                hostname: 'localhost',
                port: process.env.PORT || 8082,
                path: '/form/' + mrn,
                method: 'GET',
                agent: false,
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjE5fQ.cv-MO8XXAjdVbxMaGUfYguhsvnp4FCxk7DBlEv81bZg'
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

    getStatusFromMockServer(req, res, next) {

        let mrn = req.params.mrn || ''

        if (!mrn || mrn == '') {
            res.status(419).json(new ApiResponse(419, "Missing Parameters, check if mrn is missing"))
            return
        }

        http.get({
                hostname: 'localhost',
                port: process.env.PORT || 8082,
                path: '/status/' + mrn,
                method: 'GET',
                agent: false,
                headers: {
                    'Content-Type': 'application/pdf',
                    'x-access-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjE5fQ.cv-MO8XXAjdVbxMaGUfYguhsvnp4FCxk7DBlEv81bZg'
                }
            }, (resp) => {

                let data = []

                // gets all data
                resp.on('data', (chunk) => {
                    data.push(chunk)
                })

                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    data = Buffer.concat(data)
                    res.writeHead(200, {
                        'Content-Type': 'application/pdf',
                        'Content-Disposition': 'attachment; filename=some_file.pdf',
                        'Content-Length': data.length
                      });
                      res.end(data);
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
                    port: process.env.PORT || 8082,
                    path: '/status/' + mrn,
                    method: 'PUT',
                    agent: false,
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjE5fQ.cv-MO8XXAjdVbxMaGUfYguhsvnp4FCxk7DBlEv81bZg'
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