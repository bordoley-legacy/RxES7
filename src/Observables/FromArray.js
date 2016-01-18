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

import type {
  Disposable,
  Observer,
  Observable,
  Scheduler,
} from '../Rx';

import { createObservable } from './Create';
import { empty } from './Empty';
import { of as of } from './Of';
import * as Disposables from '../Disposables';

// FIXME: Use arrow function style, when supported by babel
const fromImmediate = function<T>(
  args: Array<T>,
): Observable<T> {
  return createObservable(observer => {
    for (let value of args) {
      observer.onNext(value);
    }
    observer.onCompleted();
  });
};

// FIXME: Use arrow function style, when supported by babel
const fromOnScheduler = function<T>(
  args: Array<T>,
  scheduler: Scheduler
): Observable<T> {
  return createObservable(observer => {
    const recursiveIterate = (
      scheduler: Scheduler,
      index: number
    ): Disposable  => index < args.length
        ? (
            observer.onNext(args[index]),
            scheduler.schedule(index + 1, recursiveIterate)
          )
        : (
            observer.onCompleted(),
            Disposables.empty
          )
        ;

    return scheduler.schedule(0, recursiveIterate);
  });
};

// FIXME: Use arrow function style, when supported by babel
export const fromArray = function<T>(
  args: Array<T>,
  scheduler?: Scheduler
): Observable<T> {
  return (
      args.length === 0 ? empty(scheduler)
    : args.length === 1 ? of(args[0], scheduler)
    : scheduler != null ? fromOnScheduler(args, scheduler)
    : /* Default Case */  fromImmediate(args)
  );
}
