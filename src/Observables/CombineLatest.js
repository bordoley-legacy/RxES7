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
  Observable,
} from '../Rx';

import { createObservable } from './Create';

import * as Disposables from '../Disposables';

// FIXME: Use arrow function style, when supported by babel
export const combineLatest2 = function<T1, T2>(
  o1: Observable<T1>,
  o2: Observable<T2>,
): Observable<[T1, T2]> {
  return createObservable((observer: Observer<[T1, T2]>) => {
    const v: [?T1, ?T2] = [];

    const onNext = () => {
      const [v1, v2] = v;
      if (
        v1 != null &&
        v2 != null
      ) {
        observer.onNext([v1, v2]);
      }
    };

    return Disposables.compose([
      o1.subscribe({
        onCompleted: observer.onCompleted,
        onError: observer.onError,
        onNext: (value: T1) => {
          v[0] = value;
          onNext();
        },
      }),
      o2.subscribe({
        onCompleted: observer.onCompleted,
        onError: observer.onError,
        onNext: (value: T2) => {
          v[1] = value;
          onNext();
        },
      }),
    ]);
  });
};

// FIXME: Use arrow function style, when supported by babel
export const combineLatest3 = function<T1, T2, T3>(
  o1: Observable<T1>,
  o2: Observable<T2>,
  o3: Observable<T3>,
): Observable<[T1, T2, T3]> {
  return createObservable((observer: Observer<[T1, T2, T3]>) => {
    const v: [?T1, ?T2, ?T3] = [];

    const onNext = () => {
      const [v1, v2, v3] = v;
      if (
        v1 != null &&
        v2 != null &&
        v3 != null
      ) {
        observer.onNext([v1, v2, v3]);
      }
    };

    return Disposables.compose([
      o1.subscribe({
        onCompleted: observer.onCompleted,
        onError: observer.onError,
        onNext: (value: T1) => {
          v[0] = value;
          onNext();
        },
      }),
      o2.subscribe({
        onCompleted: observer.onCompleted,
        onError: observer.onError,
        onNext: (value: T2) => {
          v[1] = value;
          onNext();
        },
      }),
      o3.subscribe({
        onCompleted: observer.onCompleted,
        onError: observer.onError,
        onNext: (value: T3) => {
          v[2] = value;
          onNext();
        },
      }),
    ]);
  });
};

// FIXME: Use arrow function style, when supported by babel
export const combineLatest4 = function<T1, T2, T3, T4>(
  o1: Observable<T1>,
  o2: Observable<T2>,
  o3: Observable<T3>,
  o4: Observable<T4>,
): Observable<[T1, T2, T3, T4]> {
  return createObservable((observer: Observer<[T1, T2, T3, T4]>) => {
    const v: [?T1, ?T2, ?T3, ?T4] = [];

    const onNext = () => {
      const [v1, v2, v3, v4] = v;
      if (
        v1 != null &&
        v2 != null &&
        v3 != null &&
        v4 != null
      ) {
        observer.onNext([v1, v2, v3, v4]);
      }
    };

    return Disposables.compose([
      o1.subscribe({
        onCompleted: observer.onCompleted,
        onError: observer.onError,
        onNext: (value: T1) => {
          v[0] = value;
          onNext();
        },
      }),
      o2.subscribe({
        onCompleted: observer.onCompleted,
        onError: observer.onError,
        onNext: (value: T2) => {
          v[1] = value;
          onNext();
        },
      }),
      o3.subscribe({
        onCompleted: observer.onCompleted,
        onError: observer.onError,
        onNext: (value: T3) => {
          v[2] = value;
          onNext();
        },
      }),
      o4.subscribe({
        onCompleted: observer.onCompleted,
        onError: observer.onError,
        onNext: (value: T4) => {
          v[3] = value;
          onNext();
        },
      }),
    ]);
  });
};

// FIXME: Use arrow function style, when supported by babel
export const combineLatest5 = function<T1, T2, T3, T4, T5>(
  o1: Observable<T1>,
  o2: Observable<T2>,
  o3: Observable<T3>,
  o4: Observable<T4>,
  o5: Observable<T5>/*,FIXME*/
): Observable<[T1, T2, T3, T4, T5]> {
  return  createObservable((observer: Observer<[T1, T2, T3, T4, T5]>) => {
    const v: [?T1, ?T2, ?T3, ?T4, ?T5] = [];

    const onNext = () => {
      const [v1, v2, v3, v4, v5] = v;
      if (
        v1 != null &&
        v2 != null &&
        v3 != null &&
        v4 != null &&
        v5 != null
      ) {
        observer.onNext([v1, v2, v3, v4, v5]);
      }
    };

    return Disposables.compose([
      o1.subscribe({
        onCompleted: observer.onCompleted,
        onError: observer.onError,
        onNext: (value: T1) => {
          v[0] = value;
          onNext();
        },
      }),
      o2.subscribe({
        onCompleted: observer.onCompleted,
        onError: observer.onError,
        onNext: (value: T2) => {
          v[1] = value;
          onNext();
        },
      }),
      o3.subscribe({
        onCompleted: observer.onCompleted,
        onError: observer.onError,
        onNext: (value: T3) => {
          v[2] = value;
          onNext();
        },
      }),
      o4.subscribe({
        onCompleted: observer.onCompleted,
        onError: observer.onError,
        onNext: (value: T4) => {
          v[3] = value;
          onNext();
        },
      }),
      o5.subscribe({
        onCompleted: observer.onCompleted,
        onError: observer.onError,
        onNext: (value: T5) => {
          v[4] = value;
          onNext();
        },
      }),
    ]);
  });
};

// FIXME: Use arrow function style, when supported by babel
export const combineLatest6 = function<T1, T2, T3, T4, T5, T6>(
  o1: Observable<T1>,
  o2: Observable<T2>,
  o3: Observable<T3>,
  o4: Observable<T4>,
  o5: Observable<T5>,
  o6: Observable<T6>,
): Observable<[T1, T2, T3, T4, T5, T6]> {
  return createObservable((observer: Observer<[T1, T2, T3, T4, T5, T6]>) => {
    const v: [?T1, ?T2, ?T3, ?T4, ?T5, ?T6] = [];

    const onNext = () => {
      const [v1, v2, v3, v4, v5, v6] = v;
      if (
        v1 != null &&
        v2 != null &&
        v3 != null &&
        v4 != null &&
        v5 != null &&
        v6 != null
      ) {
        observer.onNext([v1, v2, v3, v4, v5, v6]);
      }
    };

    return Disposables.compose([
      o1.subscribe({
        onCompleted: observer.onCompleted,
        onError: observer.onError,
        onNext: (value: T1) => {
          v[0] = value;
          onNext();
        },
      }),
      o2.subscribe({
        onCompleted: observer.onCompleted,
        onError: observer.onError,
        onNext: (value: T2) => {
          v[1] = value;
          onNext();
        },
      }),
      o3.subscribe({
        onCompleted: observer.onCompleted,
        onError: observer.onError,
        onNext: (value: T3) => {
          v[2] = value;
          onNext();
        },
      }),
      o4.subscribe({
        onCompleted: observer.onCompleted,
        onError: observer.onError,
        onNext: (value: T4) => {
          v[3] = value;
          onNext();
        },
      }),
      o5.subscribe({
        onCompleted: observer.onCompleted,
        onError: observer.onError,
        onNext: (value: T5) => {
          v[4] = value;
          onNext();
        },
      }),
      o6.subscribe({
        onCompleted: observer.onCompleted,
        onError: observer.onError,
        onNext: (value: T6) => {
          v[5] = value;
          onNext();
        },
      }),
    ]);
  });
};

// FIXME: Use arrow function style, when supported by babel
export const combineLatest7 = function<T1, T2, T3, T4, T5, T6, T7>(
  o1: Observable<T1>,
  o2: Observable<T2>,
  o3: Observable<T3>,
  o4: Observable<T4>,
  o5: Observable<T5>,
  o6: Observable<T6>,
  o7: Observable<T7>,
): Observable<[T1, T2, T3, T4, T5, T6, T7]> {
  return createObservable((observer: Observer<[T1, T2, T3, T4, T5, T6, T7]>) => {
    const v: [?T1, ?T2, ?T3, ?T4, ?T5, ?T6, ?T7] = [];

    const onNext = () => {
      const [v1, v2, v3, v4, v5, v6, v7] = v;
      if (
        v1 != null &&
        v2 != null &&
        v3 != null &&
        v4 != null &&
        v5 != null &&
        v6 != null &&
        v7 != null
      ) {
        observer.onNext([v1, v2, v3, v4, v5, v6, v7]);
      }
    };

    return Disposables.compose([
      o1.subscribe({
        onCompleted: observer.onCompleted,
        onError: observer.onError,
        onNext: (value: T1) => {
          v[0] = value;
          onNext();
        },
      }),
      o2.subscribe({
        onCompleted: observer.onCompleted,
        onError: observer.onError,
        onNext: (value: T2) => {
          v[1] = value;
          onNext();
        },
      }),
      o3.subscribe({
        onCompleted: observer.onCompleted,
        onError: observer.onError,
        onNext: (value: T3) => {
          v[2] = value;
          onNext();
        },
      }),
      o4.subscribe({
        onCompleted: observer.onCompleted,
        onError: observer.onError,
        onNext: (value: T4) => {
          v[3] = value;
          onNext();
        },
      }),
      o5.subscribe({
        onCompleted: observer.onCompleted,
        onError: observer.onError,
        onNext: (value: T5) => {
          v[4] = value;
          onNext();
        },
      }),
      o6.subscribe({
        onCompleted: observer.onCompleted,
        onError: observer.onError,
        onNext: (value: T6) => {
          v[5] = value;
          onNext();
        },
      }),
      o7.subscribe({
        onCompleted: observer.onCompleted,
        onError: observer.onError,
        onNext: (value: T7) => {
          v[6] = value;
          onNext();
        },
      }),
    ]);
  });
};

// FIXME: Use arrow function style, when supported by babel
export const combineLatest8 = function<T1, T2, T3, T4, T5, T6, T7, T8>(
  o1: Observable<T1>,
  o2: Observable<T2>,
  o3: Observable<T3>,
  o4: Observable<T4>,
  o5: Observable<T5>,
  o6: Observable<T6>,
  o7: Observable<T7>,
  o8: Observable<T8>,
): Observable<[T1, T2, T3, T4, T5, T6, T7, T8]> {
  return createObservable((observer: Observer<[T1, T2, T3, T4, T5, T6, T7, T8]>) => {
    const v: [?T1, ?T2, ?T3, ?T4, ?T5, ?T6, ?T7, ?T8] = [];

    const onNext = () => {
      const [v1, v2, v3, v4, v5, v6, v7, v8] = v;
      if (
        v1 != null &&
        v2 != null &&
        v3 != null &&
        v4 != null &&
        v5 != null &&
        v6 != null &&
        v7 != null &&
        v8 != null
      ) {
        observer.onNext([v1, v2, v3, v4, v5, v6, v7, v8]);
      }
    };

    return Disposables.compose([
      o1.subscribe({
        onCompleted: observer.onCompleted,
        onError: observer.onError,
        onNext: (value: T1) => {
          v[0] = value;
          onNext();
        },
      }),
      o2.subscribe({
        onCompleted: observer.onCompleted,
        onError: observer.onError,
        onNext: (value: T2) => {
          v[1] = value;
          onNext();
        },
      }),
      o3.subscribe({
        onCompleted: observer.onCompleted,
        onError: observer.onError,
        onNext: (value: T3) => {
          v[2] = value;
          onNext();
        },
      }),
      o4.subscribe({
        onCompleted: observer.onCompleted,
        onError: observer.onError,
        onNext: (value: T4) => {
          v[3] = value;
          onNext();
        },
      }),
      o5.subscribe({
        onCompleted: observer.onCompleted,
        onError: observer.onError,
        onNext: (value: T5) => {
          v[4] = value;
          onNext();
        },
      }),
      o6.subscribe({
        onCompleted: observer.onCompleted,
        onError: observer.onError,
        onNext: (value: T6) => {
          v[5] = value;
          onNext();
        },
      }),
      o7.subscribe({
        onCompleted: observer.onCompleted,
        onError: observer.onError,
        onNext: (value: T7) => {
          v[6] = value;
          onNext();
        },
      }),
      o8.subscribe({
        onCompleted: observer.onCompleted,
        onError: observer.onError,
        onNext: (value: T8) => {
          v[7] = value;
          onNext();
        },
      }),
    ]);
  });
};
