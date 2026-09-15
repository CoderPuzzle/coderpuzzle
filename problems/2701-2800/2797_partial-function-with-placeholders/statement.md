# Partial Function with Placeholders

## Description

Given a function fn and an array args, return a function partialFn.

Placeholders "_" in the args should be replaced with values from restArgs
starting from index 0. Any remaining values in the restArgs should be added
at the end of the args.

partialFn should return a result of fn. fn should be called with the
elements of the modified args passed as separate arguments.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only — LeetCode offers no other languages for it. Your submission implements
`var partial = function(fn, args) { ... }`, which returns the `partialFn`
described above, and declares `class Solution` with the method
`runPartial(fnCase)`, where `fnCase` is a bundle-provided `FnCase` carrying
`.fn`, the callable built from the case's function source; `.args`, the
prefilled argument list; and `.restArgs`, the argument list of the single
observed invocation. Build `partialFn` from your `partial(fn, args)`, invoke
it with the elements of `restArgs` spread as separate arguments, and return
the call's result. The invoked function may return any JSON value — a
number, string, boolean, array, or object — which is compared against the
expected value exactly.

### Example 1

```text
Input:
fn = (...args) => args
args = [2,4,6]
restArgs = [8,10]
Output: [2,4,6,8,10]
Explanation:
const partialFn = partial(fn, args)
const result = partialFn(...restArgs)
console.log(result) // [2,4,6,8,10]

There are no placeholders "_" in args therefore restArgs is just added at
the end of args. Then the elements of the args are passed as separate
arguments to fn, which returns passed arguments as an array.
```

### Example 2

```text
Input:
fn = (...args) => args
args = [1,2,"_",4,"_",6]
restArgs = [3,5]
Output: [1,2,3,4,5,6]
Explanation:
const partialFn = partial(fn, args)
const result = partialFn(...restArgs)
console.log(result) // [1,2,3,4,5,6]

Placeholders "_" are replaced with values from the restArgs. Then the
elements of the args are passed as separate arguments to fn, which returns
passed arguments as an array.
```

### Example 3

```text
Input:
fn = (a, b, c) => b + a - c
args = ["_", 5]
restArgs = [5, 20]
Output: -10
Explanation:
const partialFn = partial(fn, args)
const result = partialFn(...restArgs)
console.log(result) // -10

Placeholder "_" is replaced with 5 and 20 is added at the end of args. Then
the elements of the args are passed as separate arguments to fn, which
returns -10 (5 + 5 - 20).
```

### Constraints

- `fn` is a function
- `args` and `restArgs` are valid JSON arrays
- `1 <= args.length <= 5 * 10⁴`
- `1 <= restArgs.length <= 5 * 10⁴`
- `0 <= number of placeholders <= restArgs.length`
