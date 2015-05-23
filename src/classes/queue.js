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
