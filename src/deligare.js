module.exports = (function () {
    'use strict';

    /**
     * Creates the bound wrapper function
     *
     * @example
     * <pre><code>
     * var del = require('deligare');
     *
     * var add = function (a, b) {
     *     return a + b;
     * };
     *
     * var sub = function (a, b) {
     *     return a - b;
     * };
     *
     * var addOne = del(add, [1]);
     * var subTwo = del(sub, [undefined, 2]);
     *
     * addOne(5); // -> 6 (equivalent to "add(1, 5)")
     * subTwo(5); // -> 3 (equivalent to "sub(5, 2)")
     * </code></pre>
     *
     * @param {Function} fn Required. The original function
     * @param {Array} delegateValues Required. The list of parameter values which
     *      should be bound to the new function. It is possible to skip parameter
     *      when passing "undefined" (e.g. deligare(fn, [undefined, 'foo'])
     * @param {Object} [scope] Optional. The execution context for the bound wrapper
     *
     * @return {Function} The bound wrapper function
     */
    return function deligare (fn, delegateValues, scope) {
        if (typeof fn !== 'function') {
            throw 'Invalid 1st argument: "' + typeof fn + '", function expected!';
        }

        if (!Array.isArray(delegateValues)) {
            throw 'Invalid 2nd argument: "' + typeof delegateValues + '", array expected!';
        }

        var arity = fn.arity >= 0 ? fn.arity : fn.length;
        var map = [];
        var idx = 0;

        for (var i = 0, l = arity; i < l; i++) {
            var val = delegateValues[i];

            if (val === undefined) {
                map[i] = idx++;
            }
        }

        var wrapper = function delegareWrapper() {
            var args = [];

            for (var i = 0, l = arity; i < l; i++) {
                var val = delegateValues[i];

                if (val === undefined) {
                    args[i] = arguments[map[i]];
                } else {
                    args[i] = val;
                }
            }

            return fn.apply(scope || this, args);
        };

        wrapper.arity = arity;

        return wrapper;
    };
}());
