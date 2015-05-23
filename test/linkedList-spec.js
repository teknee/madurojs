var expect = require('chai').expect
var maduro = require("../build/maduro.js");

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
            list.length = 1;
        },
        createSecondNode = function (list, value) {
            list.head.next.next = new node(value);
            list.length = 2;
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

    describe("findPrev", function () {
        it("should return head if no elements are in the list", function () {
            expect(list.findPrev(1).value).to.equal("head");
        });

        it("should return head if there is only one element in the list", function () {
            createFirstNode(list, 1);
            expect(list.findPrev(1).value).to.equal("head");
        });

        it("should return the previous element in the list", function () {
            createFirstNode(list, 1);
            createSecondNode(list, 2);
            expect(list.findPrev(1).value).to.equal("head");
            expect(list.findPrev(2).value).to.equal(1);
        });
    });

    describe("insert", function () {
        it("should insert a new node after the head if no value is provided", function () {
            list.insert(2);
            expect(list.head.next.value).to.equal(2);

            list.insert(3);
            expect(list.head.next.value).to.equal(3);
        });

        it("should insert a new node after the head if the value is not found in the list", function () {
            list.insert(2);
            expect(list.head.next.value).to.equal(2);

            list.insert(3);
            list.insert(4, 5);
            expect(list.head.next.value).to.equal(4);
        });

        it("should insert a new node after the provided node", function () {
            list.insert(2);
            expect(list.head.next.value).to.equal(2);

            list.insert(3);
            list.insert(4, 3);
            expect(list.head.next.next.value).to.equal(4);
        });

        it("should increment the length of the list", function () {
            list.insert(1);
            expect(list.length).to.equal(1);
            list.insert(2);
            expect(list.length).to.equal(2);
        });
    });

    describe("remove", function () {
        it("should return null if the list is empty", function () {
            expect(list.remove(1)).to.be.null;
        });

        it("should return null if the item is not in the list", function () {
            createFirstNode(list, 1);
            createSecondNode(list, 2);
            expect(list.remove(3)).to.be.null;
        });

        it("should return the value of the removed item from the list", function () {
            createFirstNode(list, 1);
            createSecondNode(list, 2);

            expect(list.remove(2)).to.equal(2);
            expect(list.head.next.value).to.equal(1);
        });

        it("should decrement the length of the list", function () {
            createFirstNode(list, 1);
            createSecondNode(list, 2);

            expect(list.length).to.equal(2);
            list.remove(2);
            expect(list.length).to.equal(1);
            list.remove(1);
            expect(list.length).to.equal(0);
        });
    });

    describe("first", function () {
        it("should return null if there are no elements in the list", function () {
            expect(list.first()).to.be.null;
        });

        it("should return the first node in the list", function () {
            createFirstNode(list, 2);
            expect(list.first()).to.be.an("object");
            expect(list.first().value).to.equal(2);
        });
    });

    describe("clear", function () {
        it("should remove the first link in the list", function () {
            createFirstNode(list, 1);
            expect(list.head.next.value).to.equal(1);

            list.clear();
            expect(list.head.next).to.be.null;
        });

        it("should reset the length of the list to 0", function () {
            createFirstNode(list, 1);
            expect(list.head.next.value).to.equal(1);

            list.clear();
            expect(list.length).to.equal(0);
        });
    });

    describe('size', function () {
        it('should return the current length of the linkedList', function () {
            expect(list.size()).to.equal(0);
            createFirstNode(list, 2);
            expect(list.size()).to.equal(1);
            list.head.next = null;
            list.length = 0;
            expect(list.size()).to.equal(0);
        });
    });

    describe('toArray', function () {
        it('should return an empty array if the list is empty', function () {
            expect(list.toArray()).to.be.an("array");
            expect(list.toArray()).to.be.empty;
        });

        it('should return only the values of the items in the linkedList', function () {
            var listItems;
            createFirstNode(list, 3);
            createSecondNode(list, 4);

            listItems = list.toArray();

            expect(listItems).to.be.an("array");
            expect(listItems).to.have.length(2);
            expect(listItems).to.have.members([3, 4]);
        });
    });

    describe('isEmpty', function () {
        it('should return true if the list is empty', function () {
            expect(list.isEmpty()).to.be.true;
        });

        it('should return false if the list has any items', function () {
            createFirstNode(list, 1);
            expect(list.isEmpty()).to.be.false;
        });
    });
});
