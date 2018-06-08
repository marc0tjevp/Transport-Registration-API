const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')

chai.should()
chai.use(chaiHttp)


var validToken

describe('editUser',()=>{

    validToken = 'Bearer' + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjI5fQ.tcdqhtUzjxcwQCnNHQYHuFet6V2eWdfbtIa60WH36Tc"

    it('should return edit succesfull',(done)=>{
        chai.request(server)
        .put('/admin/edituser')
        .set('Authorization', validToken)
        .send({
                "userID":29,
                "username":"BoomBoom",
                "password": "password",
                "imei":"828282828",
                "firstname":"BonjourHey",
                "lastname": "AuRevoirBye"
        })
        .end(function(err,res){
            res.should.have.status(200)
            done()
        })
    })

    it('should fail on missing userID',(done)=>{
        chai.request(server)
        .put('/admin/edituser')
        .set('Authorization', validToken)
        .send({
                "username":"BoomBoom",
                "password": "password",
                "imei":"828282828",
                "firstname":"BonjourHey",
                "lastname": "AuRevoirBye"
        })
        .end(function(err,res){
            res.should.have.status(412)
            done()
        })
        
    })

    it('should fail on missing userName',(done)=>{
        chai.request(server)
        .put('/admin/edituser')
        .set('Authorization', validToken)
        .send({
                "userID":29,
                "password": "password",
                "imei":"828282828",
                "firstname":"BonjourHey",
                "lastname": "AuRevoirBye"
        })
        .end(function(err,res){
            res.should.have.status(412)
            done()
        })
        
    })

    it('should fail on missing password',(done)=>{
        chai.request(server)
        .put('/admin/edituser')
        .set('Authorization', validToken)
        .send({
                "userID":29,
                "username":"BoomBoom",
                "imei":"828282828",
                "firstname":"BonjourHey",
                "lastname": "AuRevoirBye"
        })
        .end(function(err,res){
            res.should.have.status(412)
            done()
        })
        
    })

    it('should fail on missing imei',(done)=>{
        chai.request(server)
        .put('/admin/edituser')
        .set('Authorization', validToken)
        .send({
                "userID":29,
                "username":"BoomBoom",
                "password": "password",
                "firstname":"BonjourHey",
                "lastname": "AuRevoirBye"
        })
        .end(function(err,res){
            res.should.have.status(412)
            done()
        })
        
    })
    
    it('should fail on missing firstname',(done)=>{
        chai.request(server)
        .put('/admin/edituser')
        .send({
                "userID":29,
                "username":"BoomBoom",
                "password": "password",
                "imei":"828282828",
                "lastname": "AuRevoirBye"
        })
        .set('Authorization', validToken)
        .end(function(err,res){
            res.should.have.status(412)
            done()
        })
        
    })

    it('should fail on missing lastname',(done)=>{
        chai.request(server)
        .put('/admin/edituser')
        .set('Authorization', validToken)
        .send({
                "userID":29,
                "username":"BoomBoom",
                "password": "password",
                "imei":"828282828",
                "firstname":"BonjourHey",
        })
        .end(function(err,res){
            res.should.have.status(412)
            done()
        })
        
    })

})