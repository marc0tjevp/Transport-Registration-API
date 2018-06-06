/**
 * Testcases aimed at testing the authentication process.
 */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

chai.should();
chai.use(chaiHttp);

// After successful registration we have a valid token. We export this token
// for usage in other testcases that require login.
let validToken;

describe('MRN', () => {
    it('should return a form when providing a valid mrn code', (done) => {
        chai.request(server)
            .get('/mrn-form/18IT123457384910TF')
            .set("x-access-token", "edaskjerds4234i")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                let result = res.body.result[0];


                result.should.have.property("MRN")
                result.should.have.property("DeclarationStatus")
                result.should.have.property("Reference")
                result.should.have.property("DateTime")
                result.should.have.property("Sender")
                result.should.have.property("Reciever")
                result.should.have.property("Client")
                result.should.have.property("ArticleAmount")
                result.should.have.property("TotalAmount")
                result.should.have.property("Currency")
                result.should.have.property("TotalWeight")

                done()
            });
    });

    it('should error when no valid token is supplied', (done) => {
        chai.request(server)
            .get('/mrn-form/18IT123457384910TF')
            .end((err, res) => {
                res.should.have.status(401);
                done()
            });
    });

    it('should error when invalid token is supplied', (done) => {
        chai.request(server)
            .get('/mrn-form/18IT123457384910TF')
            .set("x-access-token", "lol")
            .end((err, res) => {
                res.should.have.status(401);
                done()
            });
    });
    it('should error when no valid mrn is supplied', (done) => {
        chai.request(server)
            .get('/mrn-form/18IT123457384910T')
            .set("x-access-token", "edaskjerds4234i")
            .end((err, res) => {
                res.should.have.status(404);
                done()
            });
    });
});