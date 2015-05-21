var expect = require('chai').expect
var maduro = require("../dist/maduro.js");

describe("maduro.utils", function () {

    it("should have an identity method", function () {
        expect(maduro.utils).to.have.property("identity");
        expect(maduro.utils.identity).to.be.a("function");
    });

    it("should have an hash method", function () {
        expect(maduro.utils).to.have.property("hash");
        expect(maduro.utils.hash).to.be.a("function");
    });

    it("should have an hash16 method", function () {
        expect(maduro.utils).to.have.property("hash16");
        expect(maduro.utils.hash16).to.be.a("function");
    });

    describe("identity", function () {
        it("should return the value that is passed to it", function () {
            var obj = {};
            var num = 5;

            expect(maduro.utils.identity(obj)).to.equal(obj);
            expect(maduro.utils.identity(num)).to.equal(num);
        });
    });

    describe("hash", function () {
        it("should return a hashed value in base 10", function () {
            var hash = maduro.utils.hash("");
            expect(hash).to.be.a("string");
            expect(hash).to.equal("2166136261");
            hash = maduro.utils.hash("test");
            expect(hash).to.be.a("string");
            expect(hash).to.equal("2949673445");
        });

        it("should return a hashed value in the base provided", function () {
            var hash = maduro.utils.hash("test", 2);
            expect(hash).to.be.a("string");
            expect(hash).to.equal("10101111110100000111000111100101");
            hash = maduro.utils.hash("test", 16);
            expect(hash).to.be.a("string");
            expect(hash).to.equal("afd071e5");
            hash = maduro.utils.hash("test", 32);
            expect(hash).to.be.a("string");
            expect(hash).to.equal("2nt0sf5");
        });
    });

    describe('hash16', function () {
        it('should return a hash in base 16', function () {
            var hash = maduro.utils.hash16("");
            expect(hash).to.be.a("string");
            expect(hash).to.equal("811c9dc5");
            hash = maduro.utils.hash16("test");
            expect(hash).to.be.a("string");
            expect(hash).to.equal("afd071e5");
        });
    });
});
