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
  Subject,
} from '../Rx';

import * as Disposables from '../Disposables';

// $FlowFixMe:
export const createBehaviorSubject = /*<T>*/(initialValue: T): Subject<T> => {
  let _error: ?mixed = null;
  let _isStopped = false;
  let _observers: Array<Observer<T>> = [];
  let _value: T = initialValue;

  return {
    onCompleted: () => {
      if (!_isStopped) {
        for (let observer of _observers) {
          observer.onCompleted();
        }

        _isStopped = true;
        _observers = [];
      }
    },

    onError: (error: mixed) => {
      if (!_isStopped) {
        _error = error;

        for (let observer of _observers) {
          observer.onError(error);
        }

        _isStopped = true;
        _observers = [];
      }
    },

    onNext: (value: T) => {
      if (!_isStopped) {
        _value = value;

        for (let observer of _observers) {
          observer.onNext(value);
        }
      }
    },

    subscribe: (observer: Observer<T>): Disposable => {
      let subscription = Disposables.empty;

      if (!_isStopped) {
        subscription = Disposables.create(() => {
          const observerIndex = _observers.indexOf(observer);
          if (observerIndex >= 0) {
            _observers.splice(observerIndex, 1);
          }
        });

        const observerIndex = _observers.indexOf(observer);

        if (observerIndex < 0) {
          _observers.push(observer);
        }

        observer.onNext(_value);
      } else if (_error != null) {
        observer.onError(_error);
      } else {
        observer.onCompleted();
      }

      return subscription;
    },
  };
};
