const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')

chai.should()
chai.use(chaiHttp)

var validToken = "Bearer " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjI5fQ.tcdqhtUzjxcwQCnNHQYHuFet6V2eWdfbtIa60WH36Tc"
var driverID = 33

describe('Customs routes', () => {

    it('should return status 419 if mrn is missing', (done) => {
        chai.request(server)
            .get('/form/')
            .set('Authorization', validToken)
            .end(function (err, res) {
                res.should.have.status(419)
                done()
            })
    })
})