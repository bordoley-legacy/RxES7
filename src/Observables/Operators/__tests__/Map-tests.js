/**
 * Copyright (c) 2016, David Bordoley
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.githubusercontent.com/bordoley/RxES7/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 *
 * @flow
 */

'use strict';

jest.autoMockOff();

const Rx = require('../../../Rx');
const Observables = Rx.Observables;

describe('Observables.map()', () => {
  it('should map multiple values', () => {
    const source = [1, 2, 3];
    const result = [10, 20, 30];

    const stream = Observables.fromArray(source)
      ::Observables.Ops.map(x => 10 * x);

    expectObservable(r).toBe(result, {x: 10, y: 20, z: 30});
  });

  it('should map one value', () => {
    const source = [42];
    const result= ['42!'];

    const stream = Observables.fromArray(source)
      ::Observables.Ops.map(x => x + '!');

    expectObservable(r).toBe(result, {y: '42!'});
  });

  it('should propagate errors from map function', function () {
    const source = [42];
    const result = [];

    const stream = Observables.fromArray(source)
      ::Observables.Ops.map(x => {
        throw 'too bad';
      });

    expectObservable(r).toBe(result, null, 'too bad');
  });

/*
  it('should propagate errors from observable that emits only errors', function () {
    var a =   cold('#');
    var asubs =    '(^!)';
    var expected = '#';

    var r = a.map(identity);
    expectObservable(r).toBe(expected);
    expectSubscriptions(a.subscriptions).toBe(asubs);
  });

  it('should propagate errors from observable that emit values', function () {
    var a =   cold('--a--b--#', {a: 1, b: 2}, 'too bad');
    var asubs =    '^       !';
    var expected = '--x--y--#';

    var r = a.map(addDrama);
    expectObservable(r).toBe(expected, {x: '1!', y: '2!'}, 'too bad');
    expectSubscriptions(a.subscriptions).toBe(asubs);
  });

  it('should propagate errors from subscribe', function () {
    var r = function () {
      Observable.of(1)
        .map(identity)
        .subscribe(throwError);
    };

    expect(r).toThrow();
  });

  it('should not map an empty observable', function () {
    var a =   cold('|');
    var asubs =    '(^!)';
    var expected = '|';

    var invoked = 0;
    var r = a
      .map(function (x) { invoked++; return x; })
      .do(null, null, function () {
        expect(invoked).toBe(0);
      });

    expectObservable(r).toBe(expected);
    expectSubscriptions(a.subscriptions).toBe(asubs);
  });

  it('should allow unsubscribing explicitly and early', function () {
    var a =   cold('--1--2--3--|');
    var unsub =    '      !     ';
    var asubs =    '^     !     ';
    var expected = '--x--y-     ';

    var r = a.map(addDrama);

    expectObservable(r, unsub).toBe(expected, {x: '1!', y: '2!'});
    expectSubscriptions(a.subscriptions).toBe(asubs);
  });

  it('should map with index', function () {
    var a = hot('-5-^-4--3---2----1--|');
    var asubs =    '^                !';
    var expected = '--a--b---c----d--|';
    var values = {a: 5, b: 14, c: 23, d: 32};

    var invoked = 0;
    var r = a.map(function (x, index) {
      invoked++;
      return (parseInt(x) + 1) + (index * 10);
    }).do(null, null, function () {
      expect(invoked).toBe(4);
    });

    expectObservable(r).toBe(expected, values);
    expectSubscriptions(a.subscriptions).toBe(asubs);
  });

  it('should map with index until completed', function () {
    var a = hot('-5-^-4--3---2----1--|--8--|--#');
    var asubs =    '^                !';
    var expected = '--a--b---c----d--|';
    var values = {a: 5, b: 14, c: 23, d: 32};

    var invoked = 0;
    var r = a.map(function (x, index) {
      invoked++;
      return (parseInt(x) + 1) + (index * 10);
    }).do(null, null, function () {
      expect(invoked).toBe(4);
    });

    expectObservable(r).toBe(expected, values);
    expectSubscriptions(a.subscriptions).toBe(asubs);
  });

  it('should map with index until an error occurs', function () {
    var a = hot('-5-^-4--3---2----1--#--8--|', undefined, 'too bad');
    var asubs =    '^                !';
    var expected = '--a--b---c----d--#';
    var values = {a: 5, b: 14, c: 23, d: 32};

    var invoked = 0;
    var r = a.map(function (x, index) {
      invoked++;
      return (parseInt(x) + 1) + (index * 10);
    }).do(null, null, function () {
      expect(invoked).toBe(4);
    });

    expectObservable(r).toBe(expected, values, 'too bad');
    expectSubscriptions(a.subscriptions).toBe(asubs);
  });

  it('should map using a custom thisArg', function () {
    var a = hot('-5-^-4--3---2----1--|--8--|--#');
    var asubs =    '^                !';
    var expected = '--a--b---c----d--|';
    var values = {a: 5, b: 14, c: 23, d: 32};

    var invoked = 0;
    var foo = 42;
    var r = a
      .map(function (x, index) {
        invoked++;
        expect(this).toEqual(foo);
        return (parseInt(x) + 1) + (index * 10);
      }, 42)
      .do(null, null, function () {
        expect(invoked).toBe(4);
      });

    expectObservable(r).toBe(expected, values);
    expectSubscriptions(a.subscriptions).toBe(asubs);
  });

  it('should map twice', function () {
    var a = hot('-0----1-^-2---3--4-5--6--7-8-|--9-#-|');
    var asubs =         '^                    !';
    var expected =      '--a---b--c-d--e--f-g-|';
    var values = {a: 2, b: 3, c: 4, d: 5, e: 6, f: 7, g: 8};

    var invoked1 = 0;
    var invoked2 = 0;
    var r = a
      .map(function (x) { invoked1++; return parseInt(x) * 2; })
      .map(function (x) { invoked2++; return x / 2; })
      .do(null, null, function () {
        expect(invoked1).toBe(7);
        expect(invoked2).toBe(7);
      });

    expectObservable(r).toBe(expected, values);
    expectSubscriptions(a.subscriptions).toBe(asubs);
  });

  it('should do multiple maps using a custom thisArg', function () {
    var a =    hot('--1--2--3--4--|');
    var asubs =    '^             !';
    var expected = '--a--b--c--d--|';
    var values = {a: 11, b: 14, c: 17, d: 20};

    function Filterer() {
      this.selector1 = function (x) { return parseInt(x) + 2; };
      this.selector2 = function (x) { return parseInt(x) * 3; };
    }
    var filterer = new Filterer();

    var r = a
      .map(function (x) { return this.selector1(x);}, filterer)
      .map(function (x) { return this.selector2(x);}, filterer)
      .map(function (x) { return this.selector1(x);}, filterer);

    expectObservable(r).toBe(expected, values);
    expectSubscriptions(a.subscriptions).toBe(asubs);
  });

  it('should not break unsubscription chain when unsubscribed explicitly', function () {
    var a =   cold('--1--2--3--|');
    var unsub =    '      !     ';
    var asubs =    '^     !     ';
    var expected = '--x--y-     ';

    var r = a
      .mergeMap(function (x) { return Observable.of(x); })
      .map(addDrama)
      .mergeMap(function (x) { return Observable.of(x); });

    expectObservable(r, unsub).toBe(expected, {x: '1!', y: '2!'});
    expectSubscriptions(a.subscriptions).toBe(asubs);
  });*/
});
