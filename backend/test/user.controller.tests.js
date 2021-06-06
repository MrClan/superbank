const { superBankServer, app } = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = require("chai");
const should = chai.should();

const User = require("../app/models").users;

chai.use(chaiHttp);

var appClient = chai.request(superBankServer).keepOpen();

const endpoint = "/api/users"

describe(endpoint, () => {

    describe("GET", () => {
        it("returns 401 for unauthenticated requests", (done) => {
            appClient
                .get(endpoint)
                .end((err, res) => {
                    expect(res).to.have.status(401);
                });
            done();
        });

        it("returns current logged in user", (done) => {
            appClient
                .post("/api/auth")
                .send({
                    email: "admin@sb.com",
                    password: "1234"
                })
                .end((err, res) => {
                    const adminAuthToken = res.body.token;

                    appClient
                        .get(endpoint)
                        .set('Authorization', `Bearer ${adminAuthToken}`)
                        .end((err, res) => {
                            expect(res).to.have.status(200);
                            res.should.be.json;
                            res.body.should.be.a('object');
                            res.body.should.have.property('firstName');
                            res.body.should.have.property('lastName');
                            res.body.should.have.property('email');
                            res.body.should.have.property('isActive');
                            res.body.should.have.property('isAdmin');
                            res.body.should.have.property('id');
                        });
                });
            done();
        });
    });


    describe("POST", async () => {

        before(function (done) {
            User.deleteMany({ "email": { $ne: "admin@sb.com" } }, (err) => {
                done();
            });
        });

        it("returns newly created user", (done) => {
            appClient
                .post(endpoint)
                .send({
                    "email": "mrclan3@b.com",
                    "password": "1234",
                    "firstName": "mr",
                    "lastName": "clan2"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('firstName');
                    res.body.should.have.property('lastName');
                    res.body.should.have.property('email');
                    res.body.should.have.property('isActive');
                    res.body.should.have.property('isAdmin');
                    res.body.should.have.property('id');
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
