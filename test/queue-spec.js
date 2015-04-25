var expect = require('chai').expect
var maduro = require("../dist/maduro.js");

describe("maduro.queue", function () {
    var queue = null;

    beforeEach(function () {
        if (queue === null) {
            queue = maduro.queue();
        }
    });

    afterEach(function () {
        queue = null;
    });

    it("should have an enqueue method", function () {
        expect(queue).to.have.property("enqueue");
        expect(queue.enqueue).to.be.a("function");
    });

    it("should have an dequeue method", function () {
        expect(queue).to.have.property("dequeue");
        expect(queue.dequeue).to.be.a("function");
    });

    it("should have an front method", function () {
        expect(queue).to.have.property("front");
        expect(queue.front).to.be.a("function");
    });

    it("should have an back method", function () {
        expect(queue).to.have.property("back");
        expect(queue.back).to.be.a("function");
    });

    it("should have an length method", function () {
        expect(queue).to.have.property("length");
        expect(queue.length).to.be.a("function");
    });

    it("should have an empty method", function () {
        expect(queue).to.have.property("empty");
        expect(queue.empty).to.be.a("function");
    });

    describe("enqueue", function () {
        it("should add the element to the end of the queue", function () {
            queue.enqueue(1);
            expect(queue.data[queue.data.length - 1]).to.equal(1);
            queue.enqueue(3);
            expect(queue.data[queue.data.length - 1]).to.equal(3);
        });
    });

    describe("dequeue", function () {
        it("should return the first item in the queue", function () {
            queue.data = [3, 2, 1];
            expect(queue.dequeue()).to.equal(3);
        });

        it("should remove the returned item from the queue", function () {
            queue.data = [3, 2, 1];
            expect(queue.data).to.have.length(3);
            expect(queue.dequeue()).to.equal(3);
            expect(queue.data).to.have.length(2);
        });
    });

    describe("front", function () {
        it("should return the first item in the queue", function () {
            queue.data = [3, 2, 1];
            expect(queue.front()).to.equal(3);
        });

        it("should not remove the first item in the queue", function () {
            queue.data = [3, 2, 1];
            expect(queue.data).to.have.length(3);
            expect(queue.front()).to.equal(3);
            expect(queue.data).to.have.length(3);
            expect(queue.data[0]).to.equal(3);
        });
    });

    describe("back", function () {
        it("should return the first item in the queue", function () {
            queue.data = [3, 2, 1];
            expect(queue.back()).to.equal(1);
        });

        it("should not remove the first item in the queue", function () {
            queue.data = [3, 2, 1];
            expect(queue.data).to.have.length(3);
            expect(queue.back()).to.equal(1);
            expect(queue.data).to.have.length(3);
            expect(queue.data[queue.data.length - 1]).to.equal(1);
        });
    });

    describe("length", function () {
        it("should return the current length of the queue", function () {
            queue.data = [3, 2, 1];
            expect(queue.length()).to.equal(3);
            queue.data.shift();
            expect(queue.length()).to.equal(2);
        });
    });

    describe("empty", function () {
        it("should clear all elements from the queue", function () {
            queue.data = [1, 2, 3];
            queue.empty();

            expect(queue.data).to.be.empty;
        });
    });


});
