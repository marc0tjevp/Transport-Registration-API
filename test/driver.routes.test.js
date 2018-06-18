const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')

chai.should()
chai.use(chaiHttp)


var validToken = "Bearer "+"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjI5fQ.tcdqhtUzjxcwQCnNHQYHuFet6V2eWdfbtIa60WH36Tc"
var driverID = 33

describe('Driver routes', () => {

it('should return status 200 on succesfull sendDrivetimes',(done)=>{
    chai.request(server)
            .post('/drivetimes/senddrive')
            .send({
                "startTime": "08:15",
	            "endTime": "12:45",
	            "type": "drive",
                "mrn": "39NL29292992"
            })
            .set('Authorization', validToken)
            .end(function (err, res) {
                res.should.have.status(200)
                done()
            })  
    })

    it('should return status 412 on missing parameters sendDrivetimes',(done)=>{
        chai.request(server)
                .post('/drivetimes/senddrive')
                .send({
                    "startTime": "20:15",
                    "travelTime": "01:00",
                    "mrn": "39NL29292992",
                    "userID" : 31
                })
                .set('Authorization', validToken)
                .end(function (err, res) {
                    res.should.have.status(412)
                    done()
                })  
        })

    // it('should return status 401 when driver does not exist in sendDrivetimes',(done)=>{
    //     chai.request(server)
    //             .post('/drivetimes/senddrive')
    //             .send({
    //                     "startTime": "20:15",
    //                     "endTime": "23:45",
    //                     "type": "drive",
    //                     "mrn": "39NL29292992"
    //             })
    //             .set('Authorization', validToken)
    //             .end(function (err, res) {
    //                 res.should.have.status(401)
    //                 done()
    //             })  
    //     })

it('should return status 200 on succesfull getDriveTime',(done)=>{
    chai.request(server)
            .get('/drivetimes/getdrivebyid/'+ driverID)
            .set('Authorization', validToken)
            .end(function (err, res) {
                res.should.have.status(200)
                done()
            })  
    })

    // it('should return status 412 on missing ID getDriveTime',(done)=>{
    //     chai.request(server)
    //             .get('/drivetimes/getdrivebyid')
    //             .set('Authorization', validToken)
    //             .end(function (err, res) {
    //                 res.should.have.status(412)
    //                 done()
    //             })  
    //     })

  it('should return status 401 if there are no driveTimes for this driver',(done)=>{
    chai.request(server)
            .get('/drivetimes/getdrivebyid/39393939')
            .set('Authorization', validToken)
            .end(function (err, res) {
                res.should.have.status(401)
                done()
            })  
    })      

})