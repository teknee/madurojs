maduro.hashTable = function (keyAccessor) {

    /**
     * Provides a hash table data structure
     *
     * @class hashTable
     */
    function hashTable(keyAccessor) {
        this.data = {};
        this.getValue = keyAccessor || maduro.utils.identity;
    }

    hashTable.prototype = {

        /**
         * This function takes in a data object and adds it to the hash table using
         * the valueAccessor function to define the key value to be hashed.
         *
         * @method put
         * @param {*} data - This is the data to be stored in the hash table
         */
        put: function (data) {
            var key = keyAccessor(data),
                hash = maduro.utils.hash16(key),
                temp;
            if (this.data[hash] === undefined) {
                this.data[hash] = data;
            } else if (this.data[hash].insert) {
                this.data[hash].insert(data);
            } else {
                temp = this.data[hash];
                this.data[hash] = maduro.linkedList(keyAccessor);
                this.data[hash].insert(temp);
                this.data[hash].insert(data);
            }
        },

        /**
         * This function returns the data stored using the key to identify the element
         *
         * @method get
         * @param {string or number} key - the key that is hashed to store the data
         * @return {*} data - the data that was stored with the key
         */
        get: function (key) {
            var hash = maduro.utils.hash16(key);
            if (this.data[hash] === undefined) {
                return undefined;
            }

            return (!!this.data[hash].insert) ? this.data[hash].find(key).value : this.data[hash];
        },

        /**
         * This function empties the hash table by reseting the data.
         *
         * @method clear
         */
        clear: function () {
            this.data = {};
        }
    };

    return new hashTable(keyAccessor);
};
