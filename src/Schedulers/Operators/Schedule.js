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
} from '../../Rx';

import * as Disposables from '../../Disposables';

export const schedule = function(
  action: () => ?Disposable,
  delay?: number,
): Disposable {
  (this: Scheduler);

  return this.schedule(
    action,
    (scheduler, state) => state() || Disposables.empty,
  );
};
