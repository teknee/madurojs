maduro.bst = function( keyAccessor ) {

    function node( data ) {
        this.data = data;
        this.left = null;
        this.right = null;
    };

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
        put: function( data ) {
            var newNode = new node( data ),
                newNodeKey = this.getKey( data ),
                currNode,

                parentNode;

            if( this.root == null ) {

                this.root = newNode;
                this.size += 1;

            } else {
                currNode = this.root;
                while( true ) {
                    currNode.number++;
                    if( newNodeKey < this.getKey( currNode.data ) ) {
                        if( currNode.left === null ) {
                            currNode.left = newNode;
                            this.size += 1;
                            break;
                        } else {
                            currNode = currNode.left;
                        }
                    } else {
                        if( currNode.right === null ) {
                            currNode.right = newNode;
                            this.size += 1;
                            break;
                        } else {
                            currNode = currNode.right;
                        }
                    }
                }
            }


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
        },

        /**
         * This function traverses the bst in order.
         *
         * @method traverse
         * @param { function } callback - the function to call at each node
         */
         traverse: function( callback ) {
             function inOrder( node ) {
                 if(node !== null) {
                     inOrder(node.left);
                     callback.call(this, node);
                     inOrder(node.right);
                 }
             }

             inOrder( this.root );
        },

        /**
         * This function will traverse the bst in order and return an array of stored data
         *
         * @method toArray
         * @return { array } values - an array containing the data of all nodes in the bst
         */
        toArray: function() {
            var values = [];
            function pushValue( node ) {
                values.push( node.data );
            }

            this.traverse( pushValue );

            return values;
        }
    };

    return new bst( keyAccessor );
};
