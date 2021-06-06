const { superBankServer, app } = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = require("chai");

chai.use(chaiHttp);

var appClient = chai.request(superBankServer).keepOpen();

describe("/api/healthcheck", () => {
    describe("GET /api/healthcheck", () => {
        it("returns Api up message", (done) => {
            appClient
                .get("/api/healthcheck")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.deep.equal({ "message": "Api up." });
                });
            done();
        });
        
        it("returns 404 for post", (done) => {
            appClient
                .post("/api/healthcheck")
                .end((err, res) => {
                    expect(res).to.have.status(404);
                });
            done();
        });
    });
});
