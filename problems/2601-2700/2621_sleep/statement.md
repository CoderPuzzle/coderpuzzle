# Sleep

## Description

Given a positive integer millis, write an asynchronous function that
sleeps for millis milliseconds. It can resolve any value.

Note that minor deviation from millis in the actual sleep duration is
acceptable.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only — LeetCode offers no other languages for it. Your submission declares
`class Solution` with the method `run(sleepCase)`, where `sleepCase` is a
bundle-provided `SleepCase` carrying `.millis`, the integer above. Define
`async function sleep(millis)` at top level exactly as the signature above
suggests — it must return a Promise that settles no earlier than millis
milliseconds after the call; what it resolves with is never inspected.
Have `run` await it via `await sleepCase.measure(sleep)`: the driver times
the awaited call, fails the case if resolution lands more than 25 ms early,
and records one `"resolved"` row on success, which is the judged answer.
Oversleeping is policed by the judge's own clock — each case's whole run
shares the bundle time limit.

### Example 1

```text
Input: millis = 100
Output: 100
Explanation: It should return a promise that resolves after 100ms.
let t = Date.now();
sleep(100).then(() => {
  console.log(Date.now() - t); // 100
});
```

### Example 2

```text
Input: millis = 200
Output: 200
Explanation: It should return a promise that resolves after 200ms.
```

### Constraints

- 1 <= millis <= 1000
- Resolution earlier than `millis - 25` milliseconds fails the case;
  minor deviation above `millis` is acceptable within the judge clock.

## Hints

### Hint 1

In Javascript, you can execute code after some delay with the setTimeout(fn, sleepTime) function.

### Hint 2

An async function is defined as function which returns a Promise.

### Hint 3

To create a Promise, you can code new Promise((resolve, reject) => {}). When you want the function to return a value, code resolve(value) inside the callback.
