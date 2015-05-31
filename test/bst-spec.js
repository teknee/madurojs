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
        createBaseTree = function (bst) {
            bst.root = createNode(5);
            bst.root.left = createNode(3);
            bst.root.left.left = createNode(1);
            bst.root.left.right = createNode(4);
            bst.root.right = createNode(7);
            bst.root.right.left = createNode(6);
            bst.root.right.right = createNode(8);

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
            bst = createBaseTree(bst);

            value = bst.get(3);

            expect(value).to.be.a('number');
            expect(value).to.equal(3);

            value = bst.get(1);

            expect(value).to.be.a('number');
            expect(value).to.equal(1);
        });

        it('should return the right node of root if it is greater than the key', function () {
            var value;
            bst = createBaseTree(bst);

            value = bst.get(7);

            expect(value).to.be.a('number');
            expect(value).to.equal(7);

            value = bst.get(8);

            expect(value).to.be.a('number');
            expect(value).to.equal(8);
        });
    });

});
