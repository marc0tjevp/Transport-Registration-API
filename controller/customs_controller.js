const http = require('http');

module.exports = {
    getMRNFormFromMockserver(req, res, next) {
        let mrn = req.params.mrn;
        //makes get request
        http.get(
            //object with all connection options
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
                });

                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    res.status(resp.statusCode).json(JSON.parse(data)).end()
                });

            })
            .on("error", (err) => {
                res.status(500).json(err).end();
            })
    },
    sendFreightReadyToMockserver(req, res, next) {
        let mrn = req.params.mrn;
        //makes get request
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
                });

                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    res.status(resp.statusCode).json(JSON.parse(data)).end();
                });

            })
            .on("error", (err) => {
                res.status(500).json(err).end();
            });
    }
}