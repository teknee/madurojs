(function (root, factory) {
	// UMD (Universal Module Definition) https://github.com/umdjs/umd
	
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module unless amdModuleId is set
    	define([], factory);
  } else if (typeof exports === 'object') {
	  // Node. Does not work with strict CommonJS, but
	  // only CommonJS-like environments that support module.exports,
	  // like Node.
	  module.exports = factory();
  } else {
	  // Browser globals (root is window)
	  root.maduro = factory();
  }
  
}(this, function () {

var maduro = {
    version: "0.0.2"
};

maduro.bst = function (keyAccessor) {

    function node( data ) {
        this.data = data;
        this.left = null;
        this.right = null;
        this.number = 0;
    };



    /**
     * Provides a binary search tree data structure
     *
     * @class bst
     */
    function bst(keyAccessor) {
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
        put: function (key, data) {

        },

        /**
         * This function returns the data stored using the key to identify the element
         *
         * @method get
         * @param {string or number} key - the key that is hashed to store the data
         * @return {*} data - the data that was stored with the key
         */
        get: function (key) {
            return this._get( this.root, key );
        },
        _get: function( node, key ) {
            var nodeKey;

            if(node === null) {
                return null;
            }

            nodeKey = this.getKey( node.data );

            if( nodeKey > key ) {
                console.log(node.left);
                return this._get(node.left, key);
            } else if( nodeKey < key ) {
                return this._get(node.right, key);
            } else {
                return node.data;
            }
        }
    };

    return new bst(keyAccessor);
};

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

maduro.linkedList = function (valueAccessor) {
    var LinkedNode = function (value) {
        this.value = value;
        this.next = null;
    };

    /**
     * Provides a linked list data structure
     *
     * @class linkedList
     */
    function linkedList(valueAccessor) {
        this.getValue = valueAccessor || maduro.utils.identity;
        this.head = new LinkedNode("head");
        this.length = 0;
    }

    linkedList.prototype = {

        /**
         * This function will return the first element that matches value from the value accessor.
         * If no elements are found, it returns null.
         *
         * @method find
         * @param {number, string, or bool} value - The value to identify the element
         * @return {*} element - The element in the linked list
         */
        find: function (value) {
            var currNode = this.head;
            while (!!currNode && this.getValue(currNode.value) !== value) {
                currNode = currNode.next;
            }

            return currNode;
        },

        /**
         * This function will find the element in the list that is before the element
         * with the provided value.
         *
         * @method findPrev
         * @param {number, string, bool} value - The value used to find the element
         * @return {*} node - The node that is before in the list.
         */
        findPrev: function (value) {
            var currNode = this.head;
            while (!!currNode.next && this.getValue(currNode.next.value) !== value) {
                currNode = currNode.next;
            }

            return currNode;
        },

        /**
         * This function inserts a new element to the list after the provided node in the list.
         * If the second parameter is not provided or a reference node is not found, the new node will be
         * inserted at the front of the list. This will also increment the length of the list.
         *
         * @method insert
         * @param {*} newElement - The new element to be inserted
         * @param {number, string, bool} value - The value to identify where the new node is inserted
         * @return {object} node - The new node that was inserted.
         */
        insert: function (newValue, value) {
            var newNode = new LinkedNode(newValue),
                currNode = (arguments.length === 1) ? this.head : this.find(value) || this.head;

            newNode.next = currNode.next;
            currNode.next = newNode;

            this.length += 1;
            return newNode;
        },

        /**
         * This function will remove the first node in the list with provided value
         * and return the node value. If no matching node is found, the function will
         * return null. This will also decrement the length of the list.
         *
         * @method remove
         * @param {number, string, bool} value - The value to find a node in the list
         * @return {*} node - The found node or null
         */
        remove: function (value) {
            var prevNode = this.findPrev(value),
                currNode;

            if (prevNode.next) {
                currNode = prevNode.next;
                prevNode.next = currNode.next
                this.length -= 1;
                return currNode.value;
            }

            return prevNode.next;
        },

        /**
         * This function returns the first node in the list.
         *
         * @method first
         * @return {object} node - The first node in the list.
         */
        first: function () {
            return this.head.next;
        },

        /**
         * This function removes link from the head so there is no reference to the nodes
         * and reset the length of the list to 0.
         *
         * @method clear
         * @return {bool} result - Did the operation succeed in clearing the list
         */
        clear: function () {
            this.head.next = null;
            this.length = 0;
        },

        /**
         * This function will return the current number items in the list.
         *
         * @method size
         * @return {number} size - The number items in the list.
         */
        size: function () {
            return this.length;
        },

        /**
         * This function will take all the values in the list and put them in an array.
         *
         * @method toArray
         * @return {array} listItems - An array of all the values in the list.
         */
        toArray: function () {
            var items = [],
                currNode = this.head;

            while (currNode.next !== null) {
                items.push(currNode.next.value);
                currNode = currNode.next;
            }

            return items;
        },

        /**
         * This function returns true if the list does not contain any items.
         * Otherwise, it will return false.
         *
         * @method isEmpty
         * @return {bool} empty - A boolean value depending on whether the list has any items.
         */
        isEmpty: function () {
            return (this.length === 0 && this.head.next === null);
        }
    };

    return new linkedList(valueAccessor);
};

maduro.list = function (valueAccessor) {
    /** 
     * Provides a list abstract data structure 
     * 
     * @class List
     **/
    function List(valueAccessor) {
        this.getValue = valueAccessor || maduro.utils.identity;
        this._position = 0;
        this.data = [];
    }

    List.prototype = {

        /** 
         * This function resets the list data and current position to 0.
         * 
         * @method clear
         * @return undefined
         */
        clear: function () {
            this.data = [];
            this._position = 0;
        },

        /** 
         * This function takes an element and searchs list for the element and
         * returns the position of the element in the list.
         * 
         * @method find
         * @param {Number, Object, or String} element
         * @return {Number} The position of the element
         */
        find: function (element) {
            var i = -1,
                list = this;

            this.data.forEach(function (listElm, index) {
                if (list.getValue(listElm) == element) {
                    i = index;
                };
            });

            return i++;
        },

        /**
         * This function takes an element and adds it to the end of the list.
         * 
         * @method append
         * @param {Number, Object, or String} element
         * @return {Undefined} 
         */
        append: function (element) {
            this.data.push(element);
        },

        /**
         * This function takes an argument removes the appropriate element from 
         * the list and either returns true if successful or false if not
         * 
         * @method remove
         * @param {Number, Object, or String} element
         * @return {Bool} was removal successful
         */
        remove: function (element) {
            var index = this.find(element);

            if (index >= 0) {
                this.data.splice(index, 1);
                return true;
            }
            return false;
        },

        /**
         * This function returns the current number of element in the list.
         * 
         * @method length
         * @return {Number} number of items in the list
         */
        length: function () {
            return this.data.length;
        },

        /** 
         * This function inserts an element in the list after the provided element.
         * 
         * @method insert
         * @param {Number, Object, or String} oldElm
         * @param {Number, Object, or String} newElm
         * @return {Bool} the success of the insert 
         */
        insert: function (oldElm, newElm) {
            var index = this.find(oldElm);

            if (index > -1) {
                this.data.splice(index + 1, 0, newElm);
                return true;
            }

            return false;
        },

        /** 
         * This function returns a boolean indicating if the element is in the list.
         * 
         * @method contains
         * @param {Number, Object, or String} element
         * @return {Bool} element is in the list
         */
        contains: function (element) {
            return this.find(element) > -1;
        },

        /**
         * This function sets the current position to the front of the list..
         * 
         * @method front
         * @returns {Undefined}
         */
        front: function () {
            this._position = 0;
        },

        /** 
         * This function sets the current position to the end of the list.
         * 
         * @method end
         * @returns {Undefined}
         */
        end: function () {
            this._position = this.data.length - 1;
        },

        /** 
         * This function decrements the position by one. If the front of the list 
         * is reached it will not decrement any further.
         * 
         * @method prev
         * @returns {Undefined}
         */
        prev: function () {
            if (this._position > 0) {
                this._position -= 1;
            }
        },

        /** 
         * This function increments the position by one.
         * 
         * @method next
         * @returns {Undefined}
         */
        next: function () {
            if (this._position < this.data.length - 1) {
                this._position += 1;
            }
        },

        /**
         * This function returns the current position of the list.
         * 
         * @method position
         * @return {Number} current position
         */
        position: function () {
            return this._position + 1;
        },

        /**
         * This function sets the current position in the list. If the number is 
         * within the list, it returns true, else, it returns false.
         * 
         * @method moveTo
         * @param {Number} position
         * @return {Bool} if the operation was successful
         */
        moveTo: function (position) {
            if (position >= 1 && position <= this.data.length) {
                this._position = position - 1;
                return true;
            }

            return false;
        },

        /** 
         * This function returns the element at the current position of the list.
         * 
         * @method getElement
         * @return {Number, Object, or String} the element at the current position
         */
        getElement: function () {
            return this.data[this._position];
        }

    };

    return new List(valueAccessor);
};

maduro.queue = function () {

    /** 
     * Provides a basic queue class
     * 
     * @class Queue
     */
    function Queue() {
        this.data = [];
    };

    Queue.prototype = {

        /**
         * This function adds the passed in element to the end of the queue.
         * 
         * @method enqueue
         * @param {Number, String, Array, Object, Bool} element
         */
        enqueue: function (element) {
            this.data.push(element);
        },

        /**
         * This function returns the first item in the array and removes it
         * from the queue.
         * 
         * @method dequeue
         * @return {Number, String, Array, Object, Bool} element
         */
        dequeue: function () {
            return this.data.shift();
        },

        /**
         * This function returns the first item in the queue.
         * 
         * @method front
         * @return {Number, String, Array, Object, Bool} element
         */
        front: function () {
            return this.data[0];
        },

        /**
         * This function returns the last item in the queue
         * 
         * @method back
         * @return {Number, String, Array, Object, Bool} element
         */
        back: function () {
            return this.data[this.data.length - 1];
        },

        /** 
         * This function returns the current number of items in the queue.
         * 
         * @method length
         * @return {Number} length
         */
        length: function () {
            return this.data.length;
        },

        /**
         * This function will clear all items out of the queue.
         * 
         * @method empty
         */
        empty: function () {
            this.data = [];
        }
    };

    return new Queue();
};

maduro.stack = function () {

    /**
     * Provides a stack 
     * 
     * @class Stack
     */
    function Stack() {
        this.data = [];
        this.top = 0;
    };

    Stack.prototype = {

        /**
         * This function adds the element to the top of the stack and increases
         * the stack size
         * 
         * @method push
         * @param {Number, String, Array, Object, Bool} element
         */
        push: function (element) {
            this.data.push(element);
            this.top += 1;
        },

        /**
         * This function returns the element on the top of the stack and removes it.
         * 
         * @method pop
         * @return {Number, String, Array, Object, Bool} element
         */
        pop: function () {
            this.top -= 1;
            return this.data.pop();
        },

        /** 
         * This function returns the element on the top of the stack without
         * removing it from the stack.
         * 
         * @method peek
         * @return {Number, String, Array, Object, Bool} element
         */
        peek: function () {
            return this.data[this.top - 1];
        },

        /**
         * This function will clear all items out of the queue.
         * 
         * @method clear
         */
        clear: function () {
            this.data = [];
            this.top = 0;
        },

        /** 
         * This function returns the current number of items in the queue.
         * 
         * @method length
         * @return {Number} length
         */
        length: function () {
            return this.top;
        }
    };

    return new Stack();
};

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


return maduro;

}));
