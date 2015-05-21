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
