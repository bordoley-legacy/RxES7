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

import type { Observer } from '../Rx';

// FIXME: Use arrow function style, when supported by babel
const makeObserverSafe = function<T>(
  observer: Observer<T>
): Observer<T> {
  let isStopped = false;

  return {
    onCompleted: () => {
      if (!isStopped) {
        isStopped = true;
        observer.onCompleted();
      }
    },
    onError: error => {
      if (!isStopped) {
        isStopped = true;
        observer.onError(error);
      }
    },
    onNext: value => {
      if (!isStopped) {
        observer.onNext(value);
      }
    },
    _isSafe: true,
  };
};

// FIXME: Use arrow function style, when supported by babel
export const createSafeObserver = function<T>(
  observer: Observer<T>
): Observer<T> {
  return observer._isSafe != null
    ? observer
    : makeObserverSafe(observer);
};
