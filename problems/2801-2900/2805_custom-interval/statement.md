# Custom Interval

## Description

Function customInterval

Given a function fn, a number delay and a number period, return a number
id.

customInterval is a function that should execute the provided function fn
at intervals based on a linear pattern defined by the formula
delay + period * count.

The count in the formula represents the number of times the interval has
been executed starting from an initial value of 0.

Function customClearInterval

Given the id. id is the returned value from the function customInterval.

customClearInterval should stop executing provided function fn at
intervals.

Note: The setTimeout and setInterval functions in Node.js return an
object, not a number.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only — LeetCode offers no other languages for it. It is judged on a
deterministic virtual clock instead of real timers: your submission
declares `function customInterval(fn, delay, period)` returning a number
id and `function customClearInterval(id)` stopping the repetition tied to
that id, plus a class Solution whose `run` method hands both to the
bundle-provided driver: `intervalCase.drive(customInterval,
customClearInterval)`. During `drive` the driver replaces the global
`setTimeout`/`clearTimeout` with virtual-clock equivalents, supplies its
own recording fn (every actual execution of fn appends the virtual
execution time in milliseconds to the transcript), invokes your
customInterval once with that fn plus the case's delay and period,
schedules `customClearInterval(id)` at the case's `cancelTimeMs`, then
drains every scheduled timer to completion — earliest deadline first,
ties broken by scheduling order, which is exactly how Node drains its
timer phase. The interval's first timer registers before the cancel
timeout, while every later tick of a linear pattern has to be
re-scheduled as a fresh one-shot timer; a re-scheduled tick whose new
deadline lands exactly on `cancelTimeMs` therefore loses that tie to the
cancel timeout and is cleared unrecorded. That recorded transcript is the
judged answer shown as
Output below (the result array collected in the original harnesses). Real
elapsed time has no influence on anything. Never bypass the timers: only
executions scheduled through setTimeout and cancelled through
clearTimeout count — do not synchronously simulate future ticks, no
setImmediate, no busy waits. A fired or already-cleared handle clears
harmlessly, so stopping twice must stay a no-op.

### Example 1

```text
Input: delay = 50, period = 20, cancelTime = 225
Output: [50,120,210]
Explanation:
const t = performance.now()
const result = []

const fn = () => {
    result.push(Math.floor(performance.now() - t))
}
const id = customInterval(fn, delay, period)

setTimeout(() => {
    customClearInterval(id)
}, 225)

50 + 20 * 0 = 50 // 50ms - 1st function call
50 + 20 * 1 = 70 // 50ms + 70ms = 120ms - 2nd function call
50 + 20 * 2 = 90 // 50ms + 70ms + 90ms = 210ms - 3rd function call
```

### Example 2

```text
Input: delay = 20, period = 20, cancelTime = 150
Output: [20,60,120]
Explanation:
20 + 20 * 0 = 20 // 20ms - 1st function call
20 + 20 * 1 = 40 // 20ms + 40ms = 60ms - 2nd function call
20 + 20 * 2 = 60 // 20ms + 40ms + 60ms = 120ms - 3rd function call
```

### Example 3

```text
Input: delay = 100, period = 200, cancelTime = 500
Output: [100,400]
Explanation:
100 + 200 * 0 = 100 // 100ms - 1st function call
100 + 200 * 1 = 300 // 100ms + 300ms = 400ms - 2nd function call
```

### Constraints

- `20 <= delay, period <= 250`
- `20 <= cancelTime <= 1000`
