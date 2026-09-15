# Daily Temperatures

## Description

Given an array of integers `temperatures` represents the daily temperatures,
return an array `answer` such that `answer[i]` is the number of days you have
to wait after the `ith` day to get a warmer temperature. If there is no future
day for which this is possible, keep `answer[i] == 0` instead.

### Example 1

```text
Input: temperatures = [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]
```

### Example 2

```text
Input: temperatures = [30,40,50,60]
Output: [1,1,1,0]
```

### Example 3

```text
Input: temperatures = [30,60,90]
Output: [1,1,0]
```

### Constraints

- `1 <= temperatures.length <= 10⁵`
- `30 <= temperatures[i] <= 100`

## Hints

### Hint 1

If the temperature is, say, 70 today, then in the future a warmer temperature must be one of 71, 72, ..., 100. We could remember when each of them occurs next.

### Hint 2

Keep a stack of days whose warmer day has not been seen yet; the temperatures on that stack are decreasing.

### Hint 3

When a warm day arrives, it resolves every colder day on the stack, so each day is pushed and popped at most once.
