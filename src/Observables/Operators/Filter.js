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

import { createObservable } from '../Create';

export const filter = function<T>(
  predicate: (value: T) => bool,
): Observable<T> {
  (this: Observable<T>);

  return createObservable(
    (observer: Observer<T>) => this.subscribe({
      onCompleted: observer.onCompleted,
      onError: observer.onError,
      onNext: (value: T) => {
        let shouldRun = true;
        try {
          shouldRun = predicate(value);
        } catch (e) {
          observer.onError(e);
        }

        if (shouldRun) {
          observer.onNext(value);
        }
      },
    }),
  );
};
