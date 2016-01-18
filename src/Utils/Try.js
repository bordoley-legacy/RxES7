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

export type Try<T> = { value: T } | { error: mixed };

export const tryCatch = function<T>(
  f: () => T
): Try<T> {
  try {
    const result = f();
    return { value: result };
  } catch (e) {
    return { error: e };
  }
};

const do_ = function<T>(
  args: {
    onValue: (value: T) => void;
    onError: (error: mixed) => void;
  },
): Try<T> {
  (this: Try<T>);

  if (this.value != null) {
    args.onValue(this.value);
  }
  if (this.error != null) {
    args.onError(this.error);
  }

  return this;
}

const map = function<TSource, TResult>(
  f: (value: TSource) => TResult
): Try<TResult> {
  (this: Try<TSource>);

  return (this.value != null)
    ? tryCatch(() => f(this.value))
    : this;
};

export const Ops = {
  do_,
  map,
};
