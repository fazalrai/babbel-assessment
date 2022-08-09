process.env.NODE_ENV = "test";

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");

chai.use(chaiHttp);

describe("Email generate", () => {
  describe("/GET when domain exists", () => {
    it("it will return drive emails", (done) => {
      let request_body = {
        full_name: "Hassan Raza",
        domain: "babbel.com",
      };
      chai
        .request(server)
        .get("/")
        .send(request_body)
        .end((err, res) => {
          res.text.match("Hello welocmoe to the  World");
          done();
        });
    });
  });

  describe("/GET when domain does not exists", () => {
    it("it will return a message unable to derive email ", (done) => {
      let request_body = {
        full_name: "Hassan Raza",
        domain: "babbel.com1",
      };
      chai
        .request(server)
        .get("/")
        .send(request_body)
        .end((err, res) => {
          res.text.match("Unable to derivate email");
          done();
        });
    });
  });
});
