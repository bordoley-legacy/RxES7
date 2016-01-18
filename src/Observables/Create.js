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
} from '../Rx';

import * as Disposables from '../Disposables';

import { createSafeObserver } from '../Observers';

// FIXME: Use arrow function style, when supported by babel
export const createObservable = function<T>(
  subscribe: (observer: Observer<T>) => ?Disposable/*,*/
): Observable<T> {
  return {
    subscribe: observer => {
      observer = createSafeObserver(observer);
      return subscribe(observer) || Disposables.empty;
    },
  };
};
