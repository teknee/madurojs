var expect = require('chai').expect
var maduro = require("../build/maduro.js");

describe("maduro.list", function () {
    var list = null,
        valueGetter = function (element) {
            return element.key || null;
        };

    beforeEach(function () {
        if (list === null) {
            list = maduro.list();
        }
    });

    afterEach(function () {
        list = null;
    });

    describe("initializing", function () {

        it("should start with a list with an empty data store", function () {
            expect(list.data.length).to.equal(0);
        });

        it("should start with position at 0", function () {
            expect(list._position).to.equal(0);
        });

        it("should use the identity method if no valueAccessor is passed in", function () {
            expect(list.getValue).to.equal(maduro.utils.identity);
        });

        describe("initialize with valueAccessor", function () {
            before(function () {
                list = maduro.list(valueGetter);
            });

            it("should use the valueAccessor passed in as the getValue method", function () {
                expect(list.getValue).to.equal(valueGetter);
            });
        });
    });

    describe("clear", function () {
        it("should reset the data and the position", function () {
            list.data.push(2);
            list._position = 1;

            expect(list.data[0]).to.equal(2);
            expect(list.data.length).to.equal(1);
            expect(list._position).to.equal(1);

            list.clear();

            expect(list.data.length).to.equal(0);
            expect(list._position).to.equal(0);
        });
    });

    describe("find", function () {
        it("should find the element in the list and return its index in data", function () {
            list.data = [7, 8, 9];

            expect(list.find(7)).to.equal(0);
            expect(list.find(8)).to.equal(1);
            expect(list.find(9)).to.equal(2);
        });
    });

    describe("append", function () {
        it("should add the provided element to the end of the list", function () {
            var obj = {
                name: "test"
            };
            list.append(1);
            expect(list.data[list.data.length - 1]).to.equal(1);

            list.append(obj);
            expect(list.data[list.data.length - 1]).to.equal(obj);

        });
    });

    describe("remove", function () {
        it("should remove the provided element from the list", function () {
            list.data = [5, "test"];

            expect(list.remove("test")).to.be.true;
            expect(list.data.indexOf("test")).to.equal(-1);
            expect(list.remove("test")).to.be.false;

            expect(list.remove(5)).to.be.true;
            expect(list.data.indexOf(5)).to.equal(-1);
        });
    });

    describe("length", function () {
        it("it should return the current length of the list", function () {
            list.data = [1, 2, 3];
            expect(list.length()).to.equal(3);

            list.data.push(4);
            expect(list.length()).to.equal(4);

            list.data.pop();
            expect(list.length()).to.equal(3);
        });
    });

    describe("insert", function () {
        it("should insert the second element after the first element", function () {
            list.data = [1, 2, 3, 4, 6];
            list.insert(4, 5);

            expect(list.data.length).to.equal(6);
            expect(list.data[4]).to.equal(5);
        });

        it("should return true if the insert succeeds", function () {
            list.data = [1, 2, 3, 4, 6];

            expect(list.insert(4, 5)).to.be.true;
        });

        it("should return false if the insert fails", function () {
            list.data = [1, 2, 3, 4, 6];

            expect(list.insert(8, 5)).to.be.false;
        });
    });

    describe("contains", function () {
        it("should return true if the element is in the list", function () {
            list.data = [1, 2, 3];

            expect(list.contains(2)).to.be.true;
        });

        it("should return false if the element is not in the list", function () {
            list.data = [1, 2, 3];

            expect(list.contains(4)).to.be.false;
        });
    });

    describe("front", function () {
        it("should set the current position to the first position in the list", function () {
            list._position = 3;
            list.front();
            expect(list._position).to.equal(0);
        });
    });

    describe("end", function () {
        it("should set the current position to the last position in the list", function () {
            list.data = [1, 2, 3];
            list.end();
            expect(list._position).to.equal(2);

            list.data.push(4);
            list.end();
            expect(list._position).to.equal(3);
        });
    });

    describe("prev", function () {
        it("should decrement the current position by one", function () {
            list._position = 3;
            list.prev();
            expect(list._position).to.equal(2);
        });

        it("should not decrement if the position is at the front of the list", function () {
            list._position = 2

            list.prev();
            list.prev();
            expect(list._position).to.equal(0);

            list.prev();
            expect(list._position).to.equal(0);

            list.prev();
            expect(list._position).to.equal(0);
        });
    });

    describe("next", function () {
        it("should increment the current position by one", function () {
            list._position = 2;
            list.data = [3, 2, 1, 4];

            list.next();
            expect(list._position).to.equal(3);
        });

        it("should not increment if the position is at the end of the list", function () {
            list._position = 2;
            list.data = [3, 2, 1, 4];

            list.next();
            expect(list._position).to.equal(3);

            list.next();
            expect(list._position).to.equal(3);
        });
    });

    describe("position", function () {
        it("should return the current position in the list", function () {
            list._position = 2;
            expect(list.position()).to.equal(3);

            list._position = 5;
            expect(list.position()).to.equal(6);
        });
    });

    describe("moveTo", function () {
        it("should set the current position in the list to the number provided and return true", function () {
            list.data = [1, 2, 3, 4];

            expect(list.moveTo(4)).to.be.true;
            expect(list._position).to.equal(3);

            expect(list.moveTo(1)).to.be.true;
            expect(list._position).to.equal(0);

            expect(list.moveTo(3)).to.be.true;
            expect(list._position).to.equal(2);
        });

        it("should return false if the number provided is out side the range of the list", function () {
            list.data = [1, 2, 3, 4];

            expect(list.moveTo(5)).to.be.false;
            expect(list._position).to.equal(0);

            expect(list.moveTo(0)).to.be.false;
            expect(list._position).to.equal(0);

            list._position = 3;
            expect(list.moveTo(-1)).to.be.false;
            expect(list._position).to.equal(3);
        });
    });

    describe("getElement", function () {
        it("should return the element at the current position in the list", function () {
            list.data = [1, 2, 3, 4];
            list._position = 1;

            expect(list.getElement()).to.equal(2);

            list._position = 3;
            expect(list.getElement()).to.equal(4);
        });
    });
});
