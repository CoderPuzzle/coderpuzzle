# Promise Time Limit

## Description

Given an asynchronous function fn and a time t in milliseconds, return a
new, time limited version of the input function. fn takes arguments
provided to the time limited function.

The time limited function should follow these rules:

    If the fn completes within the time limit of t milliseconds, the time
    limited function should resolve with the result.
    If the execution of the fn exceeds the time limit, the time limited
    function should reject with the string "Time Limit Exceeded".

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only, and its timing runs on a deterministic virtual clock instead of real
timers — the bundle-provided `LimitCase` carries `.fn`, the callable built
from the case's function source, plus `.inputs` and `.t`, and both the fn
internals and your implementation arm their delays against the same
virtual clock because `setTimeout` itself is captured by the harness.
Your submission defines `timeLimit(fn, t)` and declares a class
`Solution` whose `run(limitCase)` hands that function over with
`return limitCase.drive(timeLimit)`; the driver builds
`limited = timeLimit(fn, t)`, makes exactly one judged call
`limited(...inputs)`, awaits the returned promise,
and compares the outcome object exactly: `{"resolved": <settlement
value>}` when fn wins the race or `{"rejected": <rejection reason>}`
when the limit wins, including `"Time Limit Exceeded"` for the limit.
The crawled Output column additionally displayed a wall-clock `"time"`
field (Example 1 shows `{"rejected":"Time Limit Exceeded","time":50}`);
CoderPuzzle drops that real-time field deliberately — machine speed must not
decide answers — and judges only the settled outcome above.

### Example 1

```text
Input:
fn = async (n) => {
  await new Promise(res => setTimeout(res, 100));
  return n * n;
}
inputs = [5]
t = 50
Output: {"rejected":"Time Limit Exceeded","time":50}
Explanation:
const limited = timeLimit(fn, t)
const start = performance.now()
let result;
try {
   const res = await limited(...inputs)
   result = {"resolved": res, "time": Math.floor(performance.now() - start)};
} catch (err) {
   result = {"rejected": err, "time": Math.floor(performance.now() - start)};
}
console.log(result) // Output

The provided function is set to resolve after 100ms. However, the time
limit is set to 50ms. It rejects at t=50ms because the time limit was
reached.
```

### Example 2

```text
Input:
fn = async (n) => {
  await new Promise(res => setTimeout(res, 100));
  return n * n;
}
inputs = [5]
t = 150
Output: {"resolved":25,"time":100}
Explanation:
The function resolved 5 * 5 = 25 at t=100ms. The time limit is never
reached.
```

### Example 3

```text
Input:
fn = async (a, b) => {
  await new Promise(res => setTimeout(res, 120));
  return a + b;
}
inputs = [5,10]
t = 150
Output: {"resolved":15,"time":120}
Explanation: The function resolved 5 + 10 = 15 at t=120ms. The time limit
is never reached.
```

### Example 4

```text
Input:
fn = async () => {
  throw "Error";
}
inputs = []
t = 1000
Output: {"rejected":"Error","time":0}
Explanation:
The function immediately throws an error.
```

### Constraints

- 0 <= inputs.length <= 10
- 0 <= t <= 1000
- fn returns a promise

## Hints

### Hint 1

You can return a copy of a function with:

function outerFunction(fn) {
return function innerFunction(...params) {
return fn(...params);
};
}

### Hint 2

Inside the inner function, you will need to return a new Promise.

### Hint 3

You can create a new promise like:
new Promise((resolve, reject) => {}).

### Hint 4

You can execute code with a delay with "setTimeout(fn, delay)"

### Hint 5

To reject a promise after a delay,
"setTimeout(() => reject('err'), delay)"

### Hint 6

You can resolve and reject when the passed promise resolves or rejects
with: "fn(...params).then(resolve).catch(reject)"
