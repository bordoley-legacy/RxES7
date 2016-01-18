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
  Scheduler,
} from '../Rx';

import * as FutureScheduler from './FutureScheduler';
import { immediate } from '../Schedulers';

// FIXME: Use arrow function style, when supported by babel
export const schedule = function<State>(
  state: State,
  work: (schedule: Scheduler, state: State) => Disposable,
  delay?: number,
): Disposable {
  return (delay != null && delay > 0)
    ? FutureScheduler.schedule(immediate, state, work, delay)
    : work(Immediate, state);
};
