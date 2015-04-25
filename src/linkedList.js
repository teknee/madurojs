maduro.linkedList = function (valueAccessor) {
    var linkedNode = function (value) {
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
        this.head = new linkedNode("head");
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
            console.log(currNode);
            while (!!currNode && this.getValue(currNode.value) !== value) {
                currNode = currNode.next;
            }

            return currNode;
        },

        /** 
         * This function inserts a new element to the list before the provided node in the list.
         * 
         * @method insert
         * @param {*} newElement - The new element to be inserted
         * @param {number, string, bool} value - The value to identify where the new node is inserted
         */
        insert: function (newValue, value) {
            var newNode = new linkedNode(newValue),
                currNode = (value !== undefined) ? this.find(value) : this.head;

            newNode.next = currNode.next;
            currNode.next = newNode;

            return newNode;
        },
        remove: function () {

        },


        findPrev: function () {

        },

        first: function () {

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
