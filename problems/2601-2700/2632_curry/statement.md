# Curry

## Description

Given a function fn, return a curried version of that function.

A curried function is a function that accepts fewer or an equal number of
parameters as the original function and returns either another curried
function or the same value the original function would have returned.

In practical terms, if you called the original function like sum(1,2,3), you
would call the curried version like csum(1)(2)(3), csum(1)(2,3), csum(1,2)(3),
or csum(1,2,3). All these methods of calling the curried function should
return the same value as the original.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript only —
LeetCode offers no other languages for it. Your submission declares
`class Solution` with the method `applyCurried(curryCase)`, where `curryCase`
is a bundle-provided `CurryCase` carrying `.fn`, the callable built from the
case's function source, and `.inputs`, the ordered argument batches. Inside
`applyCurried` you provide the real deliverable — a local `curry(fn)` — then
drive it: start from `curry(curryCase.fn)` and replace the current stage with
`stage(...batch)` for each batch in `.inputs`, in order. The final stage's
value is the judged output; under this problem's guarantees every sequence
terminates in the original function's return value rather than a callable.

### Example 1

```text
Input:
fn = function sum(a, b, c) { return a + b + c; }
inputs = [[1],[2],[3]]
Output: 6
Explanation:
The code being executed is:
const curriedSum = curry(fn);
curriedSum(1)(2)(3) === 6;
curriedSum(1)(2)(3) should return the same value as sum(1, 2, 3).
```

### Example 2

```text
Input:
fn = function sum(a, b, c) { return a + b + c; }
inputs = [[1,2],[3]]
Output: 6
Explanation:
curriedSum(1, 2)(3) should return the same value as sum(1, 2, 3).
```

### Example 3

```text
Input:
fn = function sum(a, b, c) { return a + b + c; }
inputs = [[],[],[1,2,3]]
Output: 6
Explanation:
You should be able to pass the parameters in any way, including all at once
or none at all.
curriedSum()()(1, 2, 3) should return the same value as sum(1, 2, 3).
```

### Example 4

```text
Input:
fn = function life() { return 42; }
inputs = [[]]
Output: 42
Explanation:
currying a function that accepts zero parameters should effectively do
nothing.
curriedLife() === 42
```

### Constraints

- `1 <= inputs.length <= 1000`
- `0 <= inputs[i][j] <= 10⁵`
- `0 <= fn.length <= 1000`
- `inputs.flat().length == fn.length`
- `function parameters explicitly defined`
- `If fn.length > 0 then the last array in inputs is not empty`
- `If fn.length === 0 then inputs.length === 1`

## Hints

### Hint 1

You can access the count of parameters expected to passed into a function
with "fn.length".

### Hint 2

You can use recursion. If the length of params passed is equal to fn.length,
you are done. Just pass those params to fn. Otherwise return a function that
is includes the previous passed params plus the new params. The new function
should contain a recursive call to curry().
