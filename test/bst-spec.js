var expect = require('chai').expect
var maduro = require("../build/maduro.js");

describe("maduro.bst", function () {
    var bst = null,
        createNode = function (data) {
            return {
                right: null,
                left: null,
                data: data,
                number: 0
            };
        },
        createMockTree = function (bst) {
            bst.root = createNode(5);
            bst.root.left = createNode(3);
            bst.root.left.left = createNode(1);
            bst.root.left.right = createNode(4);
            bst.root.right = createNode(7);
            bst.root.right.left = createNode(6);
            bst.root.right.right = createNode(8);

            return bst;
        },
        createBaseTree = function (bst) {
            bst.put(5);
            bst.put(3);
            bst.put(1);
            bst.put(4);
            bst.put(7);
            bst.put(6);
            bst.put(8);

            return bst;
        };

    beforeEach(function () {
        if (bst === null) {
            bst = maduro.bst();
        }
    });

    afterEach(function () {
        bst = null;
    });

    it("should have a size property", function () {
        expect(bst).to.have.property("size");
        expect(bst.size).to.be.a("number");
    });

    it("should have an put method", function () {
        expect(bst).to.have.property("put");
        expect(bst.put).to.be.a("function");
    });

    it("should have an get method", function () {
        expect(bst).to.have.property("get");
        expect(bst.get).to.be.a("function");
    });

    it("should have an delete method", function () {
        expect(bst).to.have.property("delete");
        expect(bst.get).to.be.a("function");
    });

    it("should have an getRange method", function () {
        expect(bst).to.have.property("getRange");
        expect(bst.get).to.be.a("function");
    });

    it("should have a traverse method", function () {
        expect(bst).to.have.property("traverse");
        expect(bst.get).to.be.a("function");
    });

    it("should have a toArray method", function () {
        expect(bst).to.have.property("toArray");
        expect(bst.get).to.be.a("function");
    });

    describe("put", function () {
        it("should set the root of the tree to the first node created", function () {
            bst.put(5);

            expect(bst.root).to.be.an("object");
            expect(bst.root.data).to.equal(5);
        });

        it("should set smaller values on the left of the tree", function () {
            bst = createBaseTree(bst);

            expect(bst.root.left.data).to.equal(3);
            expect(bst.root.left.left.data).to.equal(1);
            expect(bst.root.right.left.data).to.equal(6);
        });

        it("should set larger values on the right of the tree", function () {
            bst = createBaseTree(bst);

            expect(bst.root.right.data).to.equal(7);
            expect(bst.root.left.right.data).to.equal(4);
            expect(bst.root.right.right.data).to.equal(8);
        });

        it("should set the size property to the number of nodes", function () {
            bst = createBaseTree(bst);

            expect(bst.size).to.equal(7);

            bst.put(10);

            expect(bst.size).to.equal(8);
        });
    });

    describe("get", function () {
        it('should return null if there is nothing in the tree', function () {
            var node = bst.get();
            expect(node).to.be.null;
        });

        it('should return the first element with a matching key', function () {
            var value;
            bst.root = createNode(5);
            value = bst.get(5);

            expect(value).to.be.a('number');
            expect(value).to.equal(5);
        });

        it('should return the left node if it is less than the key', function () {
            var value;
            bst = createMockTree(bst);

            value = bst.get(3);

            expect(value).to.be.a('number');
            expect(value).to.equal(3);

            value = bst.get(1);

            expect(value).to.be.a('number');
            expect(value).to.equal(1);
        });

        it('should return the right node of root if it is greater than the key', function () {
            var value;
            bst = createMockTree(bst);

            value = bst.get(7);

            expect(value).to.be.a('number');
            expect(value).to.equal(7);

            value = bst.get(8);

            expect(value).to.be.a('number');
            expect(value).to.equal(8);
        });
    });

    describe("delete", function () {
        it("should decrement the size property whenever a node is removed", function () {
            bst = createBaseTree(bst);

            expect(bst.size).to.equal(7);

            bst.delete(1);
            expect(bst.size).to.equal(6);

            bst.delete(5);
            expect(bst.size).to.equal(5);

            bst.delete(8);
            expect(bst.size).to.equal(4);
        });

        it("should remove the node from the tree", function () {
            bst = createBaseTree(bst);

            bst.delete(1);

            expect(bst.root.left.left).to.be.null;
            expect(bst.root.left.data).to.equal(3);

            bst.delete(8);

            expect(bst.root.right.left.data).to.equal(6);
            expect(bst.root.right.right).to.be.null;

            bst.delete(5);

            expect(bst.root.data).to.equal(6);
            expect(bst.root.right.data).to.equal(7);
            expect(bst.root.right.left).to.be.null;
        });
    });

    describe("getRange", function () {
        it("should return an array of all the items that are with in the set range", function () {
            bst = createBaseTree(bst);

            var result = bst.getRange(3, 5);

            expect(result).to.have.length(3);
            expect(result).to.eql([3, 4, 5]);

            result = bst.getRange(1, 7);

            expect(result).to.have.length(6);
            expect(result).to.eql([1, 3, 4, 5, 6, 7]);
        });
    });

    describe("traverse", function () {
        it("should traverse bst in order and call the provided callback for each node", function () {
            bst = createBaseTree(bst);
            var values = [];

            function addToArray(node) {
                values.push(node.data);
            }

            bst.traverse(addToArray);

            expect(values).to.have.length(7);
            expect(values).to.have.members([1, 3, 4, 5, 6, 7, 8]);
            expect(values).to.eql([1, 3, 4, 5, 6, 7, 8]);
        });
    });

    describe("toArray", function () {
        it("should return an array of all the values stored in the bst", function () {
            bst = createBaseTree(bst);

            var values = bst.toArray();

            expect(values).to.have.length(7);
            expect(values).to.have.members([1, 3, 4, 5, 6, 7, 8]);
            expect(values).to.eql([1, 3, 4, 5, 6, 7, 8]);
        });
    });

});
