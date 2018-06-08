// Require
const express = require('express')
const app = express()
const createError = require('http-errors')
const bodyParser = require('body-parser')
const expressJWT = require('express-jwt')
const config = require('./config.json')
const expressSwagger = require('express-swagger-generator')(app)
const isReachable = require('is-reachable');

// Swagger UI
let options = {
    swaggerDefinition: {
        info: {
            title: 'Douane API',
            version: '1.0.0',
        },
        host: 'localhost:3000',
        basePath: '/',
        produces: [
            "application/json",
        ],
        schemes: ['https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: ['./routes/*.js', './model/*.js'] //Path to the API handle folder
};
expressSwagger(options)

// Route Files
let company_routes = require('./routes/company_routes')
let customs_routes = require('./routes/customs_routes')
let authentication_routes = require('./routes/authentication_routes')
let admin_routes = require('./routes/admin_routes')
let drivetime_routes = require('./routes/drivetime_routes')
let location_routes = require('./routes/location_routes')

// Use Body Parser to get properties from body in posts
app.use(bodyParser.json())

// 
app.use(expressJWT({
    secret: config.secret
}).unless({
    path: ['/auth/login', '/api/auth']
}));

// Enable CORS
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next()
})

// Hello World!
app.get('/', function (req, res, next) {
    res.send('Hello World')
})

// Routes
app.use('/company', company_routes)
app.use('/auth', authentication_routes)
app.use('/customs', customs_routes)
app.use('/admin', admin_routes)
app.use('/drivetimes', drivetime_routes)
app.use('/location', location_routes)

// var server

// // Try to connect to Mock Server
// isReachable('localhost:8082').then(reachable => {
//     if (reachable) {
//         server = app.listen(8080, function () {
//             var host = server.address().address
//             var port = server.address().port

//             console.log("Listening on port " + port)
//         })
//     } else {
//         console.log("Mock Server not reachable - Server not started")
//     }
// })

var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Listening on port " + port)
})

module.exports = server