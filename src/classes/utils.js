/**
 * A class of utility functions
 *
 * @class Utils
 */
maduro.utils = {

    /**
     * This is a basic function that just returns the provided value.
     *
     * @method identity
     * @param {Number, String, Object, Array, Bool, Function} value
     * @return {Number, String, Object, Array, Bool, Function} value
     */
    identity: function (value) {
        return value;
    },

    /**
     * This function takes a string or number and returns the hash value serialized in base 10.
     * If a radix is provided, the hash value is serialized in the provided radix.
     *
     * @method hash
     * @param {String, Number} key
     * @param {Number} radix
     * @return {String} hash
     */
    hash: function hash(key, radix) {
        var hashValue = 0x811c9dc5,
            radix = radix || 10;

        for (var i = 0; i < key.length; i++) {
            hashValue ^= key.charCodeAt(i);
            hashValue += (hashValue << 1) + (hashValue << 4) + (hashValue << 7) + (hashValue << 8) + (hashValue << 24);
        }

        return (hashValue >>> 0).toString(radix);
    },
    hash16: function (key) {
        return this.hash(key, 16);
    }
};
