# Add Two Promises

## Description

Given two promises promise1 and promise2, return a new promise. promise1
and promise2 will both resolve with a number. The returned promise should
resolve with the sum of the two numbers.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only, and its timing runs on a deterministic virtual clock instead of real
timers. Your submission defines `addTwoPromises(promise1, promise2)` — a
function taking the two input promises and returning a new promise that
resolves with their sum — and declares a class `Solution` whose
`run(driver)` hands that function to the bundle-provided driver:
`return driver.drive(addTwoPromises)`. The driver turns this case's two
specs into real promises — each resolving with its stated value once its
stated delay elapses on the virtual clock — calls your addTwoPromises with
them, awaits the returned promise, and the judge compares the resolved
number exactly. Wall-clock timing is deliberately not judged: as the
examples below state, only the sum the returned promise resolves with
matters, so any correct implementation passes regardless of machine speed.

### Example 1

```text
Input:
promise1 = new Promise(resolve => setTimeout(() => resolve(2), 20)),
promise2 = new Promise(resolve => setTimeout(() => resolve(5), 60))
Output: 7
Explanation: The two input promises resolve with the values of 2 and 5 respectively. The returned promise should resolve with a value of 2 + 5 = 7. The time the returned promise resolves is not judged for this problem.
```

### Example 2

```text
Input:
promise1 = new Promise(resolve => setTimeout(() => resolve(10), 50)),
promise2 = new Promise(resolve => setTimeout(() => resolve(-12), 30))
Output: -2
Explanation: The two input promises resolve with the values of 10 and -12 respectively. The returned promise should resolve with a value of 10 + -12 = -2.
```

### Constraints

- promise1 and promise2 are promises that resolve with a number
