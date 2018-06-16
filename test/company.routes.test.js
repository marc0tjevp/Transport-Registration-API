const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')

chai.should()
chai.use(chaiHttp)


var validToken = "Bearer "+"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjI5fQ.tcdqhtUzjxcwQCnNHQYHuFet6V2eWdfbtIa60WH36Tc"

