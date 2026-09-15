# Parallel Execution of Promises for Individual Results Retrieval

## Description

Given an array functions, return a promise promise. functions is an array
of functions that return promises fnPromise. Each fnPromise can be resolved
or rejected.

If fnPromise is resolved:

    obj = { status: "fulfilled", value: resolved value}

If fnPromise is rejected:

    obj = { status: "rejected", reason: reason of rejection (catched error message)}

The promise should resolve with an array of these objects obj. Each obj in
the array should correspond to the promises in the original array function,
maintaining the same order.

Try to implement it without using the built-in method Promise.allSettled().

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only, and its timing runs on a deterministic virtual clock instead of real
timers. Your submission defines `promiseAllSettled(functions)` and declares
a class `Solution` whose `run(driver)` hands that function to the
bundle-provided driver: `return driver.drive(promiseAllSettled)`. The driver
turns this case's specs into live functions that return real promises, each
settling after its stated delay on the virtual clock, calls your
promiseAllSettled with them, awaits the returned promise, and the judge
compares the settled array exactly: one `{status, value}` or
`{status, reason}` object per index, in the original order. Wall-clock
timing is deliberately not judged: the `"t"` field in the examples below
records how long the original harness waited, and CoderPuzzle drops it — only
the settled values are compared, so any correct implementation produces the
expected array regardless of machine speed.

### Example 1

```text
Input: functions = [
    () => new Promise(resolve => setTimeout(() => resolve(15), 100))
]
Output: {"t":100,"values":[{"status":"fulfilled","value":15}]}
Explanation:
const time = performance.now()
const promise = promiseAllSettled(functions);

promise.then(res => {
    const out = {t: Math.floor(performance.now() - time), values: res}
    console.log(out) // {"t":100,"values":[{"status":"fulfilled","value":15}]}
})

The returned promise resolves within 100 milliseconds. Since promise from
the array functions is fulfilled, the resolved value of the returned
promise is set to [{"status":"fulfilled","value":15}].
```

### Example 2

```text
Input: functions = [
    () => new Promise(resolve => setTimeout(() => resolve(20), 100)),
    () => new Promise(resolve => setTimeout(() => resolve(15), 100))
]
Output:
{
    "t":100,
    "values": [
        {"status":"fulfilled","value":20},
        {"status":"fulfilled","value":15}
    ]
}
Explanation: The returned promise resolves within 100 milliseconds, because the resolution time is determined by the promise that takes the longest time to fulfill. Since promises from the array functions are fulfilled, the resolved value of the returned promise is set to [{"status":"fulfilled","value":20},{"status":"fulfilled","value":15}].
```

### Example 3

```text
Input: functions = [
    () => new Promise(resolve => setTimeout(() => resolve(30), 200)),
    () => new Promise((resolve, reject) => setTimeout(() => reject("Error"), 100))
]
Output:
{
    "t":200,
    "values": [
        {"status":"fulfilled","value":30},
        {"status":"rejected","reason":"Error"}
    ]
}
Explanation: The returned promise resolves within 200 milliseconds, as its resolution time is determined by the promise that takes the longest time to fulfill. Since one promise from the array function is fulfilled and another is rejected, the resolved value of the returned promise is set to an array containing objects in the following order: [{"status":"fulfilled","value":30}, {"status":"rejected","reason":"Error"}]. Each object in the array corresponds to the promises in the original array function, maintaining the same order.
```

### Constraints

- 1 <= functions.length <= 10
