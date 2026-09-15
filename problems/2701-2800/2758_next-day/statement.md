# Next Day

## Description

Write code that enhances all date objects such that you can call the
date.nextDay() method on any date object and it will return the next day
in the format YYYY-MM-DD as a string.

**Note (CoderPuzzle):** on LeetCode this problem is offered in JavaScript and
TypeScript only, and there the submission keeps that original shape — add
`nextDay()` to `Date.prototype` (TypeScript merges the method into the
global `Date` interface), then declare `nextDay(date)`, which constructs
`new Date(date)` after the enhancement has run and invokes the newly
enhanced method on that object, so the judge's typed argument passes
through the same enhancement. In the other languages the same step is
simply the body of the plain function: receive the `"YYYY-MM-DD"` string
and return the formatted next day.

### Example 1

```text
Input: date = "2014-06-20"
Output: "2014-06-21"
Explanation:
const date = new Date("2014-06-20");
date.nextDay(); // "2014-06-21"
```

### Example 2

```text
Input: date = "2017-10-31"
Output: "2017-11-01"
Explanation: The day after 2017-10-31 is 2017-11-01.
```

### Constraints

- `date` is a `"YYYY-MM-DD"` calendar string
- `new Date(date)` is a valid date object

## Hints

### Hint 1

`new Date("YYYY-MM-DD")` parses as UTC midnight, so the UTC getters and
setters are the safe ones — local-time accessors can print the previous
day depending on the host's time zone.

### Hint 2

Can the engine do the calendar math for you? Advancing the UTC
day-of-month by one normalizes every month length and leap year, and
`toISOString()` already prints a zero-padded `YYYY-MM-DD`.
