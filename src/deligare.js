module.exports = (function () {
    'use strict';

    return function deligare (fn, delegateValues) {
        if (typeof fn !== 'function') {
            throw 'Invalid 1st argument: "' + typeof fn + '", function expected!';
        }

        if (!Array.isArray(delegateValues)) {
            throw 'Invalid 2nd argument: "' + typeof delegateValues + '", array expected!';
        }

        var arity = fn.length;
        var map = [];
        var idx = 0;

        for (var i = 0, l = arity; i < l; i++) {
            var val = delegateValues[i];

            if (val === undefined) {
                map[i] = idx++;
            }
        }

        return function () {
            var args = [];

            for (var i = 0, l = arity; i < l; i++) {
                var val = delegateValues[i];

                if (val === undefined) {
                    args[i] = arguments[map[i]];
                } else {
                    args[i] = val;
                }
            }

            fn.apply(this, args);
        };
    };
}());
