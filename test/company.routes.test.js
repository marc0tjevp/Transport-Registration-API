const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')

chai.should()
chai.use(chaiHttp)


var validToken = "Bearer "+"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjI5fQ.tcdqhtUzjxcwQCnNHQYHuFet6V2eWdfbtIa60WH36Tc"

describe('Company routes',()=>{
    it('should return status 200 on succesfull register', (done) => {

        chai.request(server)
            .post('/company/driver/register')
            .send({
                "driverID": 31,
                "mrn": "18IT123457999910PJ"
            })
            .set('Authorization', validToken)
            .end(function (err, res) {
                res.should.have.status(200)
                done()
            })       
    })

})