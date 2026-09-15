# Return Length of Arguments Passed

## Description

Write a function argumentsLength that returns the count of arguments passed
to it.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only — LeetCode offers no other languages for it. Your submission declares
`class Solution` with the method `solve(argsCase)`, where `argsCase` is a
bundle-provided `ArgsCase` carrying `.args`, the JSON array of values this
case passes to your function. Define `argumentsLength` so it can accept any
number of arguments, then return the result of calling it spread over that
array — `argumentsLength(...argsCase.args)` — which must be exactly the
count of arguments the call received.

### Example 1

```text
Input: args = [5]
Output: 1
Explanation:
argumentsLength(5); // 1

One value was passed to the function so it should return 1.
```

### Example 2

```text
Input: args = [{}, null, "3"]
Output: 3
Explanation:
argumentsLength({}, null, "3"); // 3

Three values were passed to the function so it should return 3.
```

### Constraints

- args is a valid JSON array
- 0 <= args.length <= 100
