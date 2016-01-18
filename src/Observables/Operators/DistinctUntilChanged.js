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
} from '../../Rx';

import * as Utils from '../../Utils';
const tryCatch = Utils.Try.tryCatch;

export const distinctUntilChanged = function<T>(
  equals?: (x: T, y: T) => boolean,
): Observable<T> {
  (this: Observable<T>);

  equals = equals || ((x, y) => x === y);

  return Rx.Observables.createObservable(observer => {
    let current: ?T = null;

    return this.subscribe({
      onCompleted: observer.onCompleted,
      onError: observer.onError,
      onNext: value => {
        tryCatch(
          () => !equals(value, current)
        )::Utils.Try.Ops.do_({
          onValue: notifyValue => {
            if (notifyValue) {
              current = value;
              observer.onNext(value);
            }
          },
          onError: observer.onError,
        });
      },
    }),
  });
};
