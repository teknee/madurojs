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
