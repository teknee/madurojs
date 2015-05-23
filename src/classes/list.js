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
