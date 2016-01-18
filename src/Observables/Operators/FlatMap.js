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
  Disposable,
} from '../../Rx';

import { createObservable } from '../Create';

export const flatMap = function<TSource, TResult>(
  f: (value:TSource) => Observable<TResult>,
): Observable<TResult> {
  (this: Observable<TSource>);

  return createObservable(
    (observer: Observer<TResult>) =>  {
      let subscription: ?Disposable;

      const unsubscribe = () => {
        if (subscription != null) {
          subscription.dispose();
          subscription = null;
        }
      };

      return this.subscribe({
        onCompleted: () => {
          unsubscribe();
          observer.onCompleted();
        },
        onError: (error: mixed) => {
          unsubscribe();
          observer.onError(error);
        },
        onNext: (value: TSource) => {
          unsubscribe();
          try {
            const result = f(value);
            subscription = result.subscribe({
              onCompleted: () => { /* do nothing */ },
              onError: (error: mixed) => {
                unsubscribe();
                observer.onError(error);
              },
              onNext: observer.onNext,
            });
          } catch (e) {
            unsubscribe();
            observer.onError(e);
          }
        },
      });
    },
  );
};
