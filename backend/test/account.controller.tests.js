const { superBankServer, app } = require("../server");
const argon2 = require("argon2");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = require("chai");
const Account = require("../app/models").accounts;
const User = require("../app/models").users;

chai.use(chaiHttp);

var appClient = chai.request(superBankServer).keepOpen();

const endpoint = "/api/accounts"

describe(endpoint, function () {

    describe("GET", function () {
        const self = this;
        self.timeout(24000);
        self.currentUser = {};
        before(function (done) {
            // clear accounts
            Account.deleteMany({}, (err) => {

                // clear users
                User.deleteMany({ "email": { $ne: "admin@sb.com" } }, (err) => {
                    argon2
                        .hash("1234")
                        .then(newPass => {
                            const user = new User({
                                firstName: "test",
                                lastName: "user",
                                email: "testuser@sb.com",
                                password: newPass,
                                isActive: true,
                                isAdmin: false
                            });

                            // create user
                            user
                                .save(user)
                                .then(data => {
                                    // add account
                                    self.currentUser = user;
                                    const account = new Account({
                                        userId: user._id,
                                        accountNo: "123456789012",
                                        bankName: "testBank",
                                        balance: 0,
                                        isActive: true
                                    });
                                    account
                                        .save(account)
                                        .then(d => {
                                            done();
                                        });
                                });
                        });
                });
            });
        });

        it("returns 401 for unauthenticated requests", (done) => {
            appClient
                .get(endpoint)
                .end((err, res) => {
                    expect(res).to.have.status(401);
                });
            done();
        });

        it("returns all accounts of user", (done) => {
            appClient
                .post("/api/auth")
                .send({
                    email: "testuser@sb.com",
                    password: "1234"
                })
                .end((err, res) => {
                    const authToken = res.body.token;

                    appClient
                        .get(endpoint)
                        .set('Authorization', `Bearer ${authToken}`)
                        .end((err, res) => {
                            expect(res).to.have.status(200);
                            res.should.be.json;
                            res.body.should.be.a('array');
                            res.body[0].should.have.property('bankName');
                            res.body[0].should.have.property('accountNo');
                            res.body[0].should.have.property('id');
                            res.body[0].should.have.property('isActive');
                            res.body[0].should.have.property('balance');
                            res.body[0].should.have.property('userId');
                            expect(res.body[0].userId).to.be.equal(self.currentUser.id);
                        });
                });
            done();
        });
    });

    describe("POST", function () {
        it("creates new account", (done) => {
            appClient
                .post("/api/auth")
                .send({
                    email: "testuser@sb.com",
                    password: "1234"
                })
                .end((err, res) => {
                    const authToken = res.body.token;

                    appClient
                        .post(endpoint)
                        .set('Authorization', `Bearer ${authToken}`)
                        .send({
                            "bankName":"TestAccount",
                            "accountNo":"123456789000"
                        })
                        .end((err, res) => {
                            expect(res).to.have.status(200);
                            res.should.be.json;
                            res.body.should.be.a('object');
                            res.body.should.have.property('id');
                            res.body.should.have.property('isActive');
                            res.body.should.have.property('balance');
                            res.body.should.have.property('userId');
                            res.body.should.have.property('bankName');               
                            expect(res.body.bankName).to.be.equal("TestAccount");
                            res.body.should.have.property('accountNo');                            
                            expect(res.body.accountNo).to.be.equal("123456789000");
                            done();
                        });
                });
        });
    })
});
