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
    }

    linkedList.prototype = {

        /**
         * This function will return the first element that matches value from the value accessor.
         * If no elements are found, it returns null.
         *
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
         * inserted at the front of the list.
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

            return newNode;
        },

        remove: function (value) {

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
        clear: function () {

        },
        size: function () {

        },
        toArray: function () {

        },
        isEmpty: function () {

        }
    };

    return new linkedList(valueAccessor);
};
