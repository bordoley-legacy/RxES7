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

import * as Rx from '../../Rx';

export const map = function<TSource, TResult>(
  f: (value: TSource) => TResult,
): Observable<TResult> {
  (this: Observable<TSource>);

  return Rx.Observables.createObservable(observer =>
    this.subscribe({
      onCompleted: observer.onCompleted,
      onError: observer.onError,
      onNext: value => {
        try {
          const result = f(value);
          observer.onNext(result);
        } catch (e) {
          observer.onError(e);
        }
      },
    }),
  );
};
