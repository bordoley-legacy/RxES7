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
} from '../../Rx';

import { createObservable } from '../Create';

import * as Schedulers from '../../Schedulers';

export const debounceTime = function<T>(
  delayMS: number,
  scheduler?: Scheduler,
): Observable<T> {
  (this: Observable<T>);

  const theScheduler = scheduler || Schedulers.Immediate;

  return createObservable(
    (observer: Observer<T>) => {
      let currentValue: ?T = null;
      let subscription: ?Disposable = null;

      const cancelDebounce = () => {
        if (subscription != null) {
          subscription.dispose();
          subscription = null;
        }
      };

      return this.subscribe({
        onCompleted: () => {
          cancelDebounce();
          if (currentValue != null) {
            observer.onNext(currentValue);
          }
          currentValue = null;
          observer.onCompleted();
        },
        onError: (error: mixed) => {
          cancelDebounce();
          if (currentValue != null) {
            observer.onNext(currentValue);
          }
          currentValue = null;
          observer.onError(error);
        },
        onNext: (value: T) => {
          cancelDebounce();
          currentValue = value;

          subscription = theScheduler::Schedulers.Ops.schedule(() => {
              if (currentValue != null) {
                observer.onNext(value);
                currentValue = null;
              }
            },
            delayMS,
          );
        },
      });
    },
  );
};
