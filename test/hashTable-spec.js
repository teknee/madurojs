var expect = require('chai').expect
var maduro = require("../dist/maduro.js");

describe("maduro.hashTable", function () {
    var hashTable = null,
        valueGetter = function (value) {
            return value.key || null;
        },
        getId = function (data) {
            return data.id;
        };

    beforeEach(function () {
        if (hashTable === null) {
            hashTable = maduro.hashTable(getId);
        }
    });

    afterEach(function () {
        hashTable = null;
    });

    it("should have a put method", function () {
        expect(hashTable).to.have.property("put");
        expect(hashTable.put).to.be.a("function");
    });

    it("should have a get method", function () {
        expect(hashTable).to.have.property("get");
        expect(hashTable.get).to.be.a("function");
    });

    it("should have an clear method", function () {
        expect(hashTable).to.have.property("clear");
        expect(hashTable.clear).to.be.a("function");
    });

    describe('put', function () {
        it('should add the data at the hash16 location in data if nothing is in that location', function () {
            hashTable.put({
                id: "test",
                data: 45
            });
            expect(hashTable.data).to.have.deep.property("afd071e5.id", "test");
            expect(hashTable.data).to.have.deep.property("afd071e5.data", 45);
        });

        it('should replace existing data with linked list in the event of a collision', function () {
            hashTable.put({
                id: "test",
                data: 45
            });

            hashTable.put({
                id: "test",
                data: 50
            });
            expect(hashTable.data.afd071e5).to.have.property("insert");
            expect(hashTable.data.afd071e5.head.next.value).to.have.property("data", 50);
            expect(hashTable.data.afd071e5.head.next.next.value).to.have.property("data", 45);
        });
    });

    describe('get', function () {
        it('should return undefined if the item does not exist in the table', function () {
            var data = hashTable.get("test");

            expect(data).to.be.undefined;
        });

        it('should get the item at the hash key from the data', function () {
            var data;
            hashTable.data.afd071e5 = {
                id: "test",
                data: 45
            };

            data = hashTable.get("test");
            expect(data).to.have.property("id", "test");
            expect(data).to.have.property("data", 45);
        });

        it('should return the correct item from the linked list in the event of a collision', function () {
            hashTable.data.e460d8b6 = maduro.linkedList(getId);
            hashTable.data.e460d8b6.head.next = {
                value: {
                    id: "altarage",
                    data: 45
                },
                next: null
            };
            hashTable.data.e460d8b6.head.next.next = {
                value: {
                    id: "zinke",
                    data: 55
                },
                next: null
            };

            expect(hashTable.get("altarage")).to.have.property("data", 45);
            expect(hashTable.get("zinke")).to.have.property("data", 55);
        });
    });

    describe('clear', function () {
        it('should clear the hashTable data', function () {
            hashTable.data.id = 123;
            hashTable.clear();
            expect(hashTable.data).to.be.empty;
        });
    });
});
