const { superBankServer, app } = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = require("chai");

chai.use(chaiHttp);

var appClient = chai.request(superBankServer).keepOpen();

describe("/api/healthcheck", () => {
    describe("GET", () => {
        it("returns Api up message", (done) => {
            appClient
                .get("/api/healthcheck")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.deep.equal({ "message": "Api up." });
                });
            done();
        });
    });

    describe("POST", () => {
        it("returns 404", (done) => {
            appClient
                .post("/api/healthcheck")
                .end((err, res) => {
                    expect(res).to.have.status(404);
                });
            done();
        });
    });
    

    describe("PATCH", () => {
        it("returns 404", (done) => {
            appClient
                .patch("/api/healthcheck")
                .end((err, res) => {
                    expect(res).to.have.status(404);
                });
            done();
        });
    });
    

    describe("DELETE", () => {
        it("returns 404", (done) => {
            appClient
                .delete("/api/healthcheck")
                .end((err, res) => {
                    expect(res).to.have.status(404);
                });
            done();
        });
    });

});
