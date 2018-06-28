const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')

chai.should()
chai.use(chaiHttp)


var validToken = "Bearer "+"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjI5fQ.tcdqhtUzjxcwQCnNHQYHuFet6V2eWdfbtIa60WH36Tc"

describe('Admin routes', () => {
    it('should return status 200 on succesfull editUser', (done) => {

        chai.request(server)
            .put('/admin/edituser')
            .send({
                "userID" : 29,
                "username" : "editted",
                "password" : "changedpass",
                "imei" : "39Nl01010129",
                "firstname" : "Gimli",
                "lastname" : "of Erebor"
            })
            .set('Authorization', validToken)
            .end(function (err, res) {
                res.should.have.status(200)
                done()
            })       
    })

    it('should return status 412 on missing parameters editUser',(done)=>{

        chai.request(server)
        .put('/admin/edituser')
        .send({
            "userID" : 29,
            "password" : "changedpass",
            "imei" : "39Nl01010129",
            "firstname" : "Gimli",
            "lastname" : "of Erebor"
        })
        .set('Authorization', validToken)
        .end(function(err,res){
            res.should.have.status(412)
            done()
        })
    })

    // it('should return status 412 on empty parameters',(done)=>{

    //     chai.request(server)
    //     .put('/admin/edituser')
    //     .send({
    //         "userID" : 29,
    //         "username" : "",
    //         "password" : "changedpass",
    //         "imei" : "39Nl01010129",
    //         "firstname" : "Gimli",
    //         "lastname" : "of Erebor"
    //     })
    //      .set('Authorization', validToken)
    //     .end(function(err,res){
    //         res.should.have.status(412)
    //         done()
    //     })
    // })

    // it('should return status 200 on succesfull delete',(done)=>{

    //     chai.request(server)
    //     .put('/admin/deleteuser')
    //     .send({
    //         "userID" : 33
    //     })
    //      .set('Authorization', validToken)
    //     .end(function(err,res){
    //         res.should.have.status(200)
    //         done()
    //     })
    // })

    it('should return status 200 on succesfull editImei',(done)=>{

        chai.request(server)
        .put('/admin/editimei')
        .send({
            "userID" : 29,
            "imei": "39Nl01010129"
        })
        .set('Authorization', validToken)
        .end(function(err,res){
            res.should.have.status(200)
            done()
        })
    })

    it('should return status 412 on missing parameters editImei',(done)=>{

        chai.request(server)
        .put('/admin/editimei')
        .send({
            "userID" : 29
        })
        .set('Authorization', validToken)
        .end(function(err,res){
            res.should.have.status(412)
            done()
        })
    })

})