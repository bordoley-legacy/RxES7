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
  Observer,
  Observable,
  Scheduler,
} from '../Rx';

import { createObservable } from './Create';
import * as Disposables from '../Disposables';
import * as Schedulers from '../Schedulers';

const emptyDefault: Observable<any> = createObservable(
  (observer: Observer<any>) => {
    observer.onCompleted();
    return Disposables.empty;
  }
);

const emptyWithScheduler = (
  scheduler: Scheduler
): Observable<any> => createObservable(
  (observer: Observer<any>) =>
    scheduler::Schedulers.Ops.schedule(observer.onCompleted),
);

// FIXME: Use arrow functions, but babel barfs on optional params
export const empty = function(
  scheduler?: Scheduler
): Observable<any> {
  return scheduler != null
  ? emptyWithScheduler(scheduler)
  : emptyDefault;
};
