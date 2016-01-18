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
  Observable,
  Scheduler,
} from '../Rx';

import { createObservable } from './Create';
import * as Disposables from '../Disposables';
import { Operators as SchedulerOps } from '../Schedulers';

// FIXME: Use arrow function style, when supported by babel
const ofImmediate = function<T>(
  t: T
): Observable<T> {
  return createObservable(observer => {
    observer.onNext(t);
    observer.onCompleted();
    return Disposables.empty;
  });
};

// FIXME: Use arrow function style, when supported by babel
const ofOnScheduler = function<T>(
  t: T,
  scheduler: Scheduler,
): Observable<T> {
  return createObservable(observer =>
    scheduler::SchedulerOps.schedule(() => {
      observer.onNext(t);
      return scheduler::SchedulerOps.schedule(() => observer.onCompleted());
    })
  );
};

// FIXME: Use arrow function style, when supported by babel
export const of = function<T>(
  t: T,
  scheduler?: Scheduler,
): Observable<T> {
  return scheduler != null
    ? ofOnScheduler(t, scheduler)
    : ofImmediate(t);
};
