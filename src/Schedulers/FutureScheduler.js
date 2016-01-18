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

 import * as Disposables from '../Disposables';

 export const schedule = function<State>(
   scheduler: Scheduler,
   state: State,
   work: (schedule: Scheduler, state: State) => Disposable,
   delay: number,
 ): Disposable {
   let disposed = false;
   let workSubscription = Disposables.empty;

   const id = setTimeout(
     () => {
       if (!disposed) {
         disposed = true;
         workSubscription = work(scheduler, state);
       }
     },
     delay,
   );

   return {
     dispose: () => {
       if (!disposed) {
         clearTimeout(id);
         disposed = true;
         workSubscription.dispose();
       }
     },
   };
 };
