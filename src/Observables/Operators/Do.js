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

import { map } from './Map';

export const do_ = function<T>(
  onNext?: (value: T) => void,
  onError?: (error: mixed) => void,
  onCompleted?: () => void,
): Observable<T> {
  (this: Observable<T>);

  return onError == null && onCompleted == null
    ? this::map(value => {
        if (onNext != null) {
          onNext(value);
        }
        return value;
      })
    : createObservable(observer => this.subscribe({
        onCompleted: () => {
          try {
            if (onCompleted != null) {
              onCompleted();
            }
          } catch (e) {
            observer.onError(e);
          }
          observer.onCompleted;
        },
        onError: (error: mixed) => {
          try {
            if (onError != null) {
              onError(error);
            }
            observer.onError(error);
          } catch (e2){
            observer.onError(e2);
          }
        },
        onNext: (value: T) => {
          try {
            if (onNext != null) {
              onNext(value);
            }
            observer.onNext(value);
          } catch (e) {
            observer.onError(e);
          }
        },
      }),
    );
};
