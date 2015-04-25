var expect = require('chai').expect
var maduro = require("../dist/maduro.js");

describe("maduro.utils", function () {

    it("should have an identity method", function () {
        expect(maduro.utils).to.have.property("identity");
        expect(maduro.utils.identity).to.be.a("function");
    });

    describe("identity", function () {
        it("should return the value that is passed to it", function () {
            var obj = {};
            var num = 5;

            expect(maduro.utils.identity(obj)).to.equal(obj);
            expect(maduro.utils.identity(num)).to.equal(num);
        });
    });
});
