var expect = require('chai').expect
var maduro = require("../dist/maduro.js");

describe("maduro.linkedList", function () {
    var list = null,
        valueGetter = function (value) {
            return value.key || null;
        },
        node = function (value) {
            this.value = value;
            this.next = null;
        },
        createFirstNode = function (list, value) {
            list.head.next = new node(value);
        };

    beforeEach(function () {
        if (list === null) {
            list = maduro.linkedList();
        }
    });

    afterEach(function () {
        list = null;
    });

    it("should have an insert method", function () {
        expect(list).to.have.property("insert");
        expect(list.insert).to.be.a("function");
    });

    it("should have an remove method", function () {
        expect(list).to.have.property("remove");
        expect(list.remove).to.be.a("function");
    });

    it("should have an find method", function () {
        expect(list).to.have.property("find");
        expect(list.find).to.be.a("function");
    });

    it("should have an findPrev method", function () {
        expect(list).to.have.property("findPrev");
        expect(list.findPrev).to.be.a("function");
    });

    it("should have an first method", function () {
        expect(list).to.have.property("first");
        expect(list.first).to.be.a("function");
    });

    it("should have an clear method", function () {
        expect(list).to.have.property("clear");
        expect(list.clear).to.be.a("function");
    });

    it("should have an size method", function () {
        expect(list).to.have.property("size");
        expect(list.size).to.be.a("function");
    });

    it("should have an toArray method", function () {
        expect(list).to.have.property("toArray");
        expect(list.toArray).to.be.a("function");
    });

    it("should have an isEmpty method", function () {
        expect(list).to.have.property("isEmpty");
        expect(list.isEmpty).to.be.a("function");
    });

    describe("find", function () {
        it("should return null if no elements are in the list", function () {
            expect(list.find(1)).to.be.null;
        });
        it("should return the first element with the provided value", function () {
            createFirstNode(list, 1);
            expect(list.find(1).value).to.equal(1);
        });
        it("should return null if no elements in the list have the provided value", function () {
            createFirstNode(list, 1);
            expect(list.find(2)).to.be.null;
        });
    });
    
    describe("")
});
