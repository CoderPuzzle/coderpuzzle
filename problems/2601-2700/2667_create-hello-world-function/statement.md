# Create Hello World Function

## Description

Write a function createHelloWorld. It should return a new function that
always returns "Hello World".

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only — LeetCode offers no other languages for it. Your submission declares
`function createHelloWorld()` with the behavior above; the generated
`class Solution` keeps its `run(helloWorldCase)` method, whose body hands
your factory to the bundle-provided driver:
`helloWorldCase.drive(createHelloWorld)`. The driver calls your factory
once per case, then replays the case's `calls` rows through the returned
function — each row holds one call's arguments (never more than ten) and
every value that comes back is recorded. The recorded list, one entry per
row, is the judged answer shown as Output below.

### Example 1

```text
Input:
calls = [[]]
Output: ["Hello World"]
Explanation:
const f = createHelloWorld();
f(); // "Hello World"

The function returned by createHelloWorld should always return "Hello World".
```

### Example 2

```text
Input:
calls = [[{},null,42]]
Output: ["Hello World"]
Explanation:
const f = createHelloWorld();
f({}, null, 42); // "Hello World"

Any arguments could be passed to the function but it should still always return "Hello World".
```

### Constraints

- `0 <= args.length <= 10`
