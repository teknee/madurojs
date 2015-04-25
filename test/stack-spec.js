var expect = require('chai').expect
var maduro = require("../dist/maduro.js");

describe("maduro.stack", function () {
    var stack = null;

    beforeEach(function () {
        if (stack === null) {
            stack = maduro.stack();
        }
    });

    afterEach(function () {
        stack = null;
    });

    it("should have an push method", function () {
        expect(stack).to.have.property("push");
        expect(stack.push).to.be.a("function");
    });

    it("should have an pop method", function () {
        expect(stack).to.have.property("pop");
        expect(stack.pop).to.be.a("function");
    });

    it("should have a peek method", function () {
        expect(stack).to.have.property("peek");
        expect(stack.peek).to.be.a("function");
    });

    it("should have a clear method", function () {
        expect(stack).to.have.property("clear");
        expect(stack.clear).to.be.a("function");
    });

    it("should have an length method", function () {
        expect(stack).to.have.property("length");
        expect(stack.length).to.be.a("function");
    });

    describe("push", function () {
        it("should add a new element on top of the stack", function () {
            stack.data = [3, 2, 1];
            stack.top = 3;
            stack.push(4);
            expect(stack.data).to.have.length(4);
            expect(stack.data[3]).to.equal(4);
            expect(stack.top).to.equal(4);
        });
    });

    describe("pop", function () {
        it("should return the top item in the stack", function () {
            stack.data = [3, 2, 1];
            expect(stack.pop()).to.equal(1);
        });

        it("should remove the top item in the stack", function () {
            stack.data = [3, 2, 1];
            stack.top = 3;

            expect(stack.data).to.have.length(3);
            expect(stack.top).to.equal(3);
            expect(stack.pop()).to.equal(1);
            expect(stack.data).to.have.length(2);
            expect(stack.data[stack.data.length - 1]).to.equal(2);
            expect(stack.top).to.equal(2);
        });
    });

    describe("peek", function () {
        it("should return the top item in the stack", function () {
            stack.data = [3, 2, 1];
            stack.top = 3;

            expect(stack.peek()).to.equal(1);
        });

        it("should not remove the top item in the stack", function () {
            stack.data = [3, 2, 1];
            stack.top = 3;

            expect(stack.data).to.have.length(3);
            expect(stack.top).to.equal(3);
            expect(stack.peek()).to.equal(1);
            expect(stack.data).to.have.length(3);
            expect(stack.data[stack.data.length - 1]).to.equal(1);
            expect(stack.top).to.equal(3);
        });
    });

    describe("clear", function () {
        it("should clear all elements from the stack", function () {
            stack.data = [1, 2, 3];
            stack.clear();

            expect(stack.data).to.be.empty;
            expect(stack.top).to.equal(0);
        });
    });

    describe("length", function () {
        it("should return the current length of the stack", function () {
            stack.top = 3;
            expect(stack.length()).to.equal(3);
            stack.top = 2;
            expect(stack.length()).to.equal(2);
        });
    });
});
