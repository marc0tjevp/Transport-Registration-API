const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')

chai.should()
chai.use(chaiHttp)


var validToken

describe('Registration', () => {
    it('should return a token when providing valid information', (done) => {

        chai.request(server)
            .post('/auth/register')
            .send({
                "username": "Janos",
                "password": "password",
                "firstname": "Jan",
                "lastname": "Ramadan",
                "imei": "122356553"
            })
            .end(function (err, res) {
                res.should.have.status(200)
                res.should.be.json
                validToken = res.body.token
            })

        // Export token to use in other tests
        module.exports = {
            token: validToken
        }
        done()
    })

    it('should return an error on GET request', (done) => {
        chai.request(server)
            .get('/auth/register')
            .end(function (err, res) {
                res.should.have.status(404)
            })
        done()
    })

    it('should throw an error when the user already exists', (done) => {
        chai.request(server)
            .post('/auth/register')
            .send({
                "username": "Janos",
                "password": "password",
                "firstname": "Jan",
                "lastname": "Ramadan",
                "imei": "122356553"
            })
            .end(function (err, res) {
                res.should.have.status(409)
                res.should.be.json
            })
        done()
    })

    it('should throw an error when no username is provided', (done) => {
        chai.request(server)
            .post('/auth/register')
            .send({
                "password": "password",
                "firstname": "Jan",
                "lastname": "Ramadan",
                "imei": "122356553"
            })
            .end(function (err, res) {
                res.should.have.status(412)
                res.should.be.json
            })
        done()
    })

    it('should throw an error when no password is provided', (done) => {
        chai.request(server)
            .post('/auth/register')
            .send({
                "username": "Janos",
                "firstname": "Jan",
                "lastname": "Ramadan",
                "imei": "122356553"
            })
            .end(function (err, res) {
                res.should.have.status(412)
                res.should.be.json
            })
        done()
    })

    it('should throw an error when no firstname is provided', (done) => {
        chai.request(server)
            .post('/auth/register')
            .send({
                "username": "Janos",
                "password": "password",
                "lastname": "Ramadan",
                "imei": "122356553"
            })
            .end(function (err, res) {
                res.should.have.status(412)
                res.should.be.json
            })
        done()
    })

    it('should throw an error when no lastname is provided', (done) => {
        chai.request(server)
            .post('/auth/register')
            .send({
                "username": "Janos",
                "password": "password",
                "firstname": "Jan",
                "imei": "122356553"
            })
            .end(function (err, res) {
                res.should.have.status(412)
                res.should.be.json
            })
        done()
    })

    it('should throw an error when no imei is provided', (done) => {
        chai.request(server)
            .post('/auth/register')
            .send({
                "username": "Janos",
                "password": "password",
                "firstname": "Jan",
                "lastname": "Ramadan"
            })
            .end(function (err, res) {
                res.should.have.status(412)
                res.should.be.json
            })
        done()
    })
    

    it('should throw an error when firstname is shorter than 2 chars', (done) => {
        chai.request(server)
            .post('/auth/register')
            .send({
                "firstname": "E",
                "lastname": "de Vries",
                "email": "someone2@domain.com",
                "password": "passwordGoesHereM8"
            })
            .end(function (err, res) {
                res.should.have.status(412)
                res.should.be.json
                validToken = res.body.token
            })
        done()
    })

    it('should throw an error when lastname is shorter than 2 chars', (done) => {
        chai.request(server)
            .post('/api/register')
            .send({
                "firstname": "Henk",
                "lastname": "V",
                "email": "someone4@domain.com",
                "password": "passwordGoesHereM8"
            })
            .end(function (err, res) {
                res.should.have.status(412)
                res.should.be.json
                validToken = res.body.token
            })
        done()
    })

})


describe('Login', () => {

    it('should return a token when providing valid information', (done) => {
        chai.request(server)
            .post('/auth/login')
            .send({
                "username": "Janos",
                "password": "password",
                "imei" : "122356553"
            })
            .end(function (err, res) {
                res.should.have.status(200)
                res.should.be.json
                res.body.should.be.a('object')
            })
        done()
    })

    it('should throw an error when username does not exist', (done) => {
        chai.request(server)
            .post('/auth/login')
            .send({
                "username": "blallalala",
                "password": "password",
                "imei" : "122356553"
            })
            .end(function (err, res) {
                res.should.have.status(401)
                res.should.be.json
                res.body.should.be.a('object')
            })
        done()
    })

    it('should throw an error when username exists but password is invalid', (done) => {
        chai.request(server)
            .post('/api/login')
            .send({
                "email": "Janos",
                "password": "badstuff",
                "imei" : "122356553"
            })
            .end(function (err, res) {
                res.should.have.status(401)
                res.should.be.json
            })
        done()
    })

    it('should throw an error when using an invalid imei', (done) => {
        chai.request(server)
            .post('/api/login')
            .send({
                "email": "Janos",
                "password": "password",
                "imei" : "111111111111"
            })
            .end(function (err, res) {
                res.should.have.status(412)
                res.should.be.json
            })
        done()
    })

})