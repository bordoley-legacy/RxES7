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

export type Disposable = {
  dispose: () => void;
};

export type Observer<T> = {
  onCompleted: () => void;
  onError: (error: mixed) => void;
  onNext: (value: T) => void;
};

export type Observable<T> = {
  subscribe: (observer: Observer<T>) => Disposable;
};

export type Subject<T> = Observer<T> & Observable<T>;

export type Scheduler = {
  schedule: <State>(
    state: State,
    work: (scheduler: Scheduler, state: State) => Disposable,
    delay?: number,
  ) => Disposable;
};

export * as Observers from './Observers.js';
export * as Observables from './Observables.js';
export * as Schedulers from './Schedulers.js';
export * as Subjects from './Subjects.js';
