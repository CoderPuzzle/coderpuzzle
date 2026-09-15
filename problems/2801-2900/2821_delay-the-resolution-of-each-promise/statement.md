# Delay the Resolution of Each Promise

## Description

Given an array functions and a number ms, return a new array of
functions.

functions is an array of functions that return promises. ms represents
the delay duration in milliseconds. It determines the amount of time to
wait before resolving or rejecting each promise in the new array.

Each function in the new array should return a promise that resolves or
rejects after an additional delay of ms milliseconds, preserving the
order of the original functions array.

The delayAll function should ensure that each promise from functions is
executed with a delay, forming the new array of functions returning
delayed promises.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only, and its timing runs on a deterministic virtual clock instead of
real timers — the bundle-provided `DelayCase` carries `.fns`, the
callables built from the case's function sources (each returns a
promise), plus `.ms`, and both the function internals and your
implementation arm their delays against the same virtual clock because
`setTimeout` itself is captured by the harness. Your submission defines
`delayAll(functions, ms)` and declares a class `Solution` whose
`run(delayCase)` hands that function over with `return
delayCase.drive(delayAll)`; the driver builds the delayed function
array, invokes each returned function exactly once in original order at
virtual time 0, waits until every delayed promise settles, and compares
the settlement timestamps (in virtual milliseconds, one per input
function, in original order) against the expected arrays below.
Resolution and rejection are judged identically — the crawl's Output
rows record only when each promise settled, never with what — so a
promise whose source rejects still contributes its settle timestamp.

### Example 1

```text
Input:
functions = [
   () => new Promise((resolve) => setTimeout(resolve, 30))
],
ms = 50
Output: [80]
Explanation: The promise from the array would have resolved after
30 ms, but it was delayed by 50 ms, thus 30 ms + 50 ms = 80 ms.
```

### Example 2

```text
Input:
functions = [
    () => new Promise((resolve) => setTimeout(resolve, 50)),
    () => new Promise((resolve) => setTimeout(resolve, 80))
],
ms = 70
Output: [120,150]
Explanation: The promises from the array would have resolved after
50 ms and 80 ms, but they were delayed by 70 ms, thus 50 ms + 70 ms =
120 ms and 80 ms + 70 ms = 150 ms.
```

### Example 3

```text
Input:
functions = [
    () => new Promise((resolve, reject) => setTimeout(reject, 20)),
    () => new Promise((resolve, reject) => setTimeout(reject, 100))
],
ms = 30
Output: [50,130]
```

### Constraints

- functions is an array of functions that return promises
- 10 <= ms <= 500
- 1 <= functions.length <= 10
