maduro.bst = function( keyAccessor ) {

    function node( data ) {
        this.data = data;
        this.left = null;
        this.right = null;
        this.number = 0;
    };

    function _get( node, key, getKey ) {
        var nodeKey;

        if( node === null ) {
            return null;
        }

        nodeKey = getKey( node.data );

        if( nodeKey > key ) {
            console.log( node.left );
            return _get( node.left, key, getKey );
        } else if( nodeKey < key ) {
            return _get( node.right, key, getKey );
        } else {
            return node.data;
        }
    };

    function _put( key, value ) {

    }

    /**
     * Provides a binary search tree data structure
     *
     * @class bst
     */
    function bst( keyAccessor ) {
        this.root = null;
        this.size = 0;
        this.getKey = keyAccessor || maduro.utils.identity;
    }

    bst.prototype = {

        /**
         * This function takes in a data object and adds it to the hash table using
         * the valueAccessor function to define the key value to be hashed.
         *
         * @method put
         * @param {*} data - This is the data to be stored in the hash table
         */
        put: function( key, data ) {

        },

        /**
         * This function returns the data stored using the key to identify the element
         *
         * @method get
         * @param {string or number} key - the key that is hashed to store the data
         * @return {*} data - the data that was stored with the key
         */
        get: function( key ) {
            var currNode = this.root,
                currKey;

            while( currNode !== null && this.getKey( currNode.data ) != key ) {
                if( this.getKey( currNode.data ) > key ) {
                    currNode = currNode.left;
                } else {
                    currNode = currNode.right;
                }
            }

            if( currNode == null ) {
                return null;
            }

            return currNode.data;
        }
    };

    return new bst( keyAccessor );
};