// Require
var express = require('express')
var app = express()
var createError = require('http-errors')
var bodyParser = require('body-parser')
const expressJWT = require('express-jwt')
const config = require('./config.json')
const expressSwagger = require('express-swagger-generator')(app)

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
    files: ['./routes/*.js'] //Path to the API handle folder
};
expressSwagger(options)

// Database
var db = require('./database/database')

// Route Files
let company_routes = require('./routes/company_routes')
let customs_routes = require('./routes/customs_routes')
let authentication_routes = require('./routes/authentication_routes')
let admin_routes = require('./routes/admin_routes')

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

// Listen
var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Listening on port " + port)
})

module.exports = server