# Execute Asynchronous Functions in Parallel

## Description

Given an array of asynchronous functions functions, return a new promise
promise. Each function in the array accepts no arguments and returns a
promise. All the promises should be executed in parallel.

promise resolves:

When all the promises returned from functions were resolved successfully
in parallel. The resolved value of promise should be an array of all the
resolved values of promises in the same order as they were in the
functions. The promise should resolve when all the asynchronous functions
in the array have completed execution in parallel.

promise rejects:

When any of the promises returned from functions were rejected. promise
should also reject with the reason of the first rejection.

Please solve it without using the built-in Promise.all function.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only, and its timing runs on a deterministic virtual clock instead of real
timers. Your submission defines `promiseAll(functions)` and declares a
class `Solution` whose `run(driver)` hands that function to the
bundle-provided driver: `return driver.drive(promiseAll)`. The driver turns
this case's specs into live functions that return real promises, each
settling after its stated delay on the virtual clock, calls your
promiseAll with them, and awaits the returned promise: when every function
resolves, your promise must resolve with all the values ordered by their
original index, and when any function rejects, your promise must reject
with the reason of the first rejection (simultaneous rejections break ties
by original index). Wall-clock timing is deliberately not judged: the
`"t"` field in the examples below records how long the original harness
waited, and CoderPuzzle drops it — each case compares exactly one outcome,
either `{"resolved": [...]}` or `{"rejected": <reason>}`, so any correct
implementation produces the expected result regardless of machine speed.

### Example 1

```text
Input: functions = [
  () => new Promise(resolve => setTimeout(() => resolve(5), 200))
]
Output: {"t": 200, "resolved": [5]}
Explanation:
promiseAll(functions).then(console.log); // [5]

The single function was resolved at 200ms with a value of 5.
```

### Example 2

```text
Input: functions = [
    () => new Promise(resolve => setTimeout(() => resolve(1), 200)),
    () => new Promise((resolve, reject) => setTimeout(() => reject("Error"), 100))
]
Output: {"t": 100, "rejected": "Error"}
Explanation: Since one of the promises rejected, the returned promise also rejected with the same error at the same time.
```

### Example 3

```text
Input: functions = [
    () => new Promise(resolve => setTimeout(() => resolve(4), 50)),
    () => new Promise(resolve => setTimeout(() => resolve(10), 150)),
    () => new Promise(resolve => setTimeout(() => resolve(16), 100))
]
Output: {"t": 150, "resolved": [4, 10, 16]}
Explanation: All the promises resolved with a value. The returned promise resolved when the last promise resolved.
```

### Constraints

- functions is an array of functions that returns promises
- 1 <= functions.length <= 10
