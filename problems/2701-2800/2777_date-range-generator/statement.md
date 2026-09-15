# Date Range Generator

## Description

Given a start date start, an end date end, and a positive integer step,
return a generator object that yields dates in the range from start to end
inclusive.

The value of step indicates the number of days between consecutive yielded
values.

All yielded dates must be in the string format YYYY-MM-DD.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only. Your submission defines a generator function
`dateRangeGenerator(start, end, step)` that yields one date string per
step, and declares a class `Solution` whose `run(genCase)` hands that
function to the bundle-provided case carrier:
`genCase.drive(dateRangeGenerator)`. The driver calls the generator with
this case's `start`, `end`, and `step`, advances the returned generator by
repeated `.next()` calls until it reports done, and the judge compares the
array of collected `.value` strings — the yielded dates in yield order —
against the expected list exactly. The generator object itself never
crosses the wire; only its yielded strings are judged.

### Example 1

```text
Input: start = "2023-04-01", end = "2023-04-04", step = 1
Output: ["2023-04-01","2023-04-02","2023-04-03","2023-04-04"]
Explanation:
const g = dateRangeGenerator(start, end, step);
g.next().value // '2023-04-01'
g.next().value // '2023-04-02'
g.next().value // '2023-04-03'
g.next().value // '2023-04-04'
```

### Example 2

```text
Input: start = "2023-04-10", end = "2023-04-20", step = 3
Output: ["2023-04-10","2023-04-13","2023-04-16","2023-04-19"]
Explanation:
const g = dateRangeGenerator(start, end, step);
g.next().value // '2023-04-10'
g.next().value // '2023-04-13'
g.next().value // '2023-04-16'
g.next().value // '2023-04-19'
```

### Example 3

```text
Input: start = "2023-04-10", end = "2023-04-10", step = 1
Output: ["2023-04-10"]
Explanation:
const g = dateRangeGenerator(start, end, step);
g.next().value // '2023-04-10'
```

### Constraints

- new Date(start) <= new Date(end)
- start and end dates are in the string format YYYY-MM-DD
- 0 <= The difference in days between the start date and the end date <= 1500
- 1 <= step <= 1000
