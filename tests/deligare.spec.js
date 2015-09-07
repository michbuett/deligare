/* global window */
describe('deligare', function () {
    'use strict';

    var del = typeof require === 'function' ? require('../src/deligare') : window.deligare;

    it('creates new functions', function () {
        // prepare
        var orgFn = function (a, b) { return a + b; };

        // execute
        var newFn = del(orgFn, []);

        // verify
        expect(typeof newFn).toBe('function');
    });


    it('allows to bind parameter values', function () {
        // prepare
        var spy = jasmine.createSpy('orgFn');
        var orgFn = function (a, b, c) { spy(a, b, c); };
        var newFn = del(orgFn, ['foo', 'bar']);

        // execute
        newFn('baz');

        // verify
        expect(spy).toHaveBeenCalledWith('foo', 'bar', 'baz');
    });

    it('allows to skip parameter when binding', function () {
        // prepare
        var spy = jasmine.createSpy('orgFn');
        var orgFn = function (a, b, c) { spy(a, b, c); };
        var newFn = del(orgFn, ['foo', undefined, 'baz']);

        // execute
        newFn('bar');

        // verify
        expect(spy).toHaveBeenCalledWith('foo', 'bar', 'baz');
    });

    it('allows multiple binding', function () {
        // prepare
        var spy = jasmine.createSpy('orgFn');
        var orgFn = function (a, b, c) { spy(a, b, c); };
        var newFn = del(del(del(orgFn, ['foo']), ['bar']), ['baz']);

        // execute
        newFn();

        // verify
        expect(spy).toHaveBeenCalledWith('foo', 'bar', 'baz');
    });

    it('makes the new function return the result of the original one', function () {
        // prepare
        var orgFn = function (a, b, c) { return a + b + c; };
        var newFn = del(orgFn, [undefined, undefined, 3]);

        // execute
        var result = newFn(1, 2);

        // verify
        expect(result).toBe(1 + 2 + 3);
    });

    it('throws an error if no function is passed as 1st argument', function () {
        expect(function () { del(); }).toThrow('Invalid 1st argument: "undefined", function expected!');
        expect(function () { del(1); }).toThrow('Invalid 1st argument: "number", function expected!');
        expect(function () { del('foo'); }).toThrow('Invalid 1st argument: "string", function expected!');
        expect(function () { del(null); }).toThrow('Invalid 1st argument: "object", function expected!');
    });

    it('throws an error if no array is passed as 2nd argument', function () {
        var fn = function () {};

        expect(function () { del(fn); }).toThrow('Invalid 2nd argument: "undefined", array expected!');
        expect(function () { del(fn, 1); }).toThrow('Invalid 2nd argument: "number", array expected!');
        expect(function () { del(fn, 'foo'); }).toThrow('Invalid 2nd argument: "string", array expected!');
        expect(function () { del(fn, null); }).toThrow('Invalid 2nd argument: "object", array expected!');
    });
});
