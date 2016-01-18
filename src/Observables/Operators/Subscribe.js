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
  Observable,
  Disposable,
} from '../../Rx';

export const subscribe = function<T>(
  args: {
    onCompleted?: () => void;
    onError?: (error: mixed) => void;
    onNext?: (value: T) => void,
  },
): Disposable {
  (this: Observable<T>);

  return this.subscribe({
    onCompleted: args.onCompleted || (() => {}),
    onError: args.onError || (e => {}),
    onNext: args.onNext || (v => {}),
  });
};
