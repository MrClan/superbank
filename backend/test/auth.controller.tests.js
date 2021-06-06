const { superBankServer, app } = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = require("chai");

const should = chai.should();
chai.use(chaiHttp);

var appClient = chai.request(superBankServer).keepOpen();

const endpoint = "/api/auth"

describe(endpoint, () => {
    describe("GET", () => {
        it("returns 404", (done) => {
            appClient
                .get(endpoint)
                .end((err, res) => {
                    expect(res).to.have.status(404);
                });
            done();
        });
    });
    describe("POST", () => {

        it("without body returns bad request", (done) => {
            appClient
                .post(endpoint)
                .end((err, res) => {
                    res.should.have.status(400);
                });
            done();
        });


        it("with invalid creds returns unauthorized", (done) => {
            appClient
                .post(endpoint)
                .set('content-type', 'application/json')
                .send({
                    email: "mrclan1@sb.com",
                    password: "1234"
                })
                .end((err, res) => {
                    expect(res).to.have.status(401);
                });
            done();
        });
        
        it("with valid creds returns token", (done) => {
            appClient
                .post(endpoint)
                .set('content-type', 'application/json')
                .send({
                    email: "admin@sb.com",
                    password: "1234"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('token');
                });
            done();
        });
    });
    

    describe("PATCH", () => {
        it("returns 404", (done) => {
            appClient
                .patch(endpoint)
                .end((err, res) => {
                    expect(res).to.have.status(404);
                });
            done();
        });
    });
    

    describe("DELETE", () => {
        it("returns 404", (done) => {
            appClient
                .delete(endpoint)
                .end((err, res) => {
                    expect(res).to.have.status(404);
                });
            done();
        });
    });
});
