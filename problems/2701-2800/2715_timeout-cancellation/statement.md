# Timeout Cancellation

## Description

Given a function fn, an array of arguments args, and a timeout t in
milliseconds, return a cancel function cancelFn.

After a delay of cancelTimeMs, the returned cancel function cancelFn will
be invoked.

setTimeout(cancelFn, cancelTimeMs)

Initially, the execution of the function fn should be delayed by t
milliseconds.

If, before the delay of t milliseconds, the function cancelFn is invoked,
it should cancel the delayed execution of fn. Otherwise, if cancelFn is
not invoked within the specified delay t, fn should be executed with the
provided args as arguments.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only — LeetCode offers no other languages for it. It is also judged on a
deterministic virtual clock instead of real timers: your submission
declares `function cancellable(fn, args, t)` plus a class Solution whose
`run` method hands your function to the bundle-provided driver:
`timeoutCase.drive(cancellable)`. During `drive` the driver replaces the
global `setTimeout`/`clearTimeout` with virtual-clock equivalents,
constructs your `cancellable(fn, args, t)` (fn records the transcript:
every actual execution pushes one row `{"time": <virtual execution time>,
"returned": <the value fn returned>}`), schedules the returned cancelFn at
the case's `cancelTimeMs`, then drains every scheduled timer to completion
— earliest deadline first, ties broken by scheduling order, exactly as
Node drains its timer queue. That recorded transcript is the judged answer
shown as `Output` below. Real elapsed time has no influence on anything.
Never bypass the timers (no setImmediate or synchronous invocation) — only
executions scheduled through setTimeout and cancelled through
clearTimeout count. Invoking cancelFn more than once, or after fn already
ran, must be harmless: a cancelled-or-fired timer is gone.

### Example 1

```text
Input: fn = (x) => x * 5, args = [2], t = 20
cancelTimeMs = 50
Output: [{"time": 20, "returned": 10}]
Explanation:
const cancelTimeMs = 50;
const cancelFn = cancellable((x) => x * 5, [2], 20);
setTimeout(cancelFn, cancelTimeMs);

The cancellation was scheduled to occur after a delay of cancelTimeMs (50ms), which happened after the execution of fn(2) at 20ms.
```

### Example 2

```text
Input: fn = (x) => x**2, args = [2], t = 100
cancelTimeMs = 50
Output: []
Explanation:
const cancelTimeMs = 50;
const cancelFn = cancellable((x) => x**2, [2], 100);
setTimeout(cancelFn, cancelTimeMs);

The cancellation was scheduled to occur after a delay of cancelTimeMs (50ms), which happened before the execution of fn(2) at 100ms, resulting in fn(2) never being called.
```

### Example 3

```text
Input: fn = (x1, x2) => x1 * x2, args = [2,4], t = 30
cancelTimeMs = 100
Output: [{"time": 30, "returned": 8}]
Explanation:
const cancelTimeMs = 100;
const cancelFn = cancellable((x1, x2) => x1 * x2, [2,4], 30);
setTimeout(cancelFn, cancelTimeMs);

The cancellation was scheduled to occur after a delay of cancelTimeMs (100ms), which happened after the execution of fn(2,4) at 30ms.
```

### Constraints

- `fn` is a function
- `args` is a valid JSON array
- `1 <= args.length <= 10`
- `20 <= t <= 1000`
- `10 <= cancelTimeMs <= 1000`
