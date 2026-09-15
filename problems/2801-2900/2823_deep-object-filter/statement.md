# Deep Object Filter

## Description

Given an object or an array `obj` and a function `fn`, return a filtered
object or array `filteredObject`.

Function `deepFilter` should perform a deep filter operation on the `obj`.
The deep filter operation should remove properties for which the output of
the filter function `fn` is false, as well as any empty objects or arrays
that remain after the keys have been removed.

If the deep filter operation results in an empty object or array, with no
remaining properties, `deepFilter` should return `undefined` to indicate
that there is no valid data left in the `filteredObject`.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only — LeetCode offers no other languages for it. Your submission declares
the function `deepFilter(obj, fn)` plus a class `Solution` whose
`solve(deepCase)` hands that function to the bundle-provided case carrier:
`deepCase.drive(deepFilter)`. Each case carries a JSON value `obj` and a
function source `fn`; the driver builds the callable from that source,
calls your `deepFilter` with `(obj, fn)` once, and records the answer —
the returned object or array itself, compared exactly, or JSON `null`
when your function returns `undefined` because no valid data was left.
That recorded value is what the judge scores.

### Example 1

```text
Input:
obj = [-5, -4, -3, -2, -1, 0, 1],
fn = (x) => x > 0
Output: [1]
Explanation: All values that were not greater than 0 were removed.
```

### Example 2

```text
Input:
obj = {"a": 1, "b": "2", "c": 3, "d": "4", "e": 5, "f": 6, "g": {"a": 1}},
fn = (x) => typeof x === "string"
Output: {"b":"2","d":"4"}
Explanation: All keys with values that were not a string were removed.
When the object keys were removed during the filtering process, any
resulting empty objects were also removed.
```

### Example 3

```text
Input:
obj = [-1, [-1, -1, 5, -1, 10], -1, [-1], [-5]],
fn = (x) => x > 0
Output: [[5,10]]
Explanation: All values that were not greater than 0 were removed. When
the values were removed during the filtering process, any resulting empty
arrays were also removed.
```

### Example 4

```text
Input:
obj = [[[[5]]]],
fn = (x) => Array.isArray(x)
Output: undefined
```

### Constraints

- `fn` is a function that returns a boolean value
- `obj` is a valid JSON object or array
- `2 <= JSON.stringify(obj).length <= 10⁵`
