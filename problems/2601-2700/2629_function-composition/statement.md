# Function Composition

## Description

Given an array of functions [f1, f2, f3, ..., fn], return a new function fn that is the function composition of the array of functions.

The function composition of [f(x), g(x), h(x)] is fn(x) = f(g(h(x))).

The function composition of an empty list of functions is the identity function f(x) = x.

You may assume each function in the array accepts one integer as input and returns one integer as output.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript only — LeetCode offers no other languages for it. Your submission declares `function compose(functions)` returning the composed function, plus a class Solution whose `run` method hands your function to the bundle-provided driver:
`composeCase.drive(compose)`. The driver builds every case's function from its source text, hands the resulting array of callables to your `compose`, requires a function back, calls it once at `composeCase.x`, and records the returned integer — that recorded value is the judged answer shown as `Output` below. The driver also keeps a per-function call count and accepts a case only when every supplied function was called exactly once, so the returned function must genuinely thread its input through the whole chain (an empty array makes no calls and must behave as identity).

### Example 1

```text
Input: functions = [x => x + 1, x => x * x, x => 2 * x], x = 4
Output: 65
Explanation:
Evaluating from right to left ...
Starting with x = 4.
2 * (4) = 8
(8) * (8) = 64
(64) + 1 = 65
```

### Example 2

```text
Input: functions = [x => 10 * x, x => 10 * x, x => 10 * x], x = 1
Output: 1000
Explanation:
Evaluating from right to left ...
10 * (1) = 10
10 * (10) = 100
10 * (100) = 1000
```

### Example 3

```text
Input: functions = [], x = 42
Output: 42
Explanation:
The composition of zero functions is the identity function
```

### Constraints

- `-1000 <= x <= 1000`
- `0 <= functions.length <= 1000`
- all functions accept and return a single integer

## Hints

### Hint 1

Start by returning a function that takes in a number and returns a number.

### Hint 2

Call each of the functions in the correct order. Each time passing the output of the previous function into the next function.
