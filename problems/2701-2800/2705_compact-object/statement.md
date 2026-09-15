# Compact Object

## Description

Given an object or array obj, return a compact object.

A compact object is the same as the original object, except with keys
containing falsy values removed. This operation applies to the object and
any nested objects. Arrays are considered objects where the indices are
keys. A value is considered falsy when Boolean(value) returns false.

You may assume the obj is the output of JSON.parse. In other words, it is
valid JSON.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only — LeetCode offers no other languages for it. Your entry point is a
class `Solution` with `run(caseRunner)`; inside it, call
`caseRunner.check(this)`. The case runner then hands your
`compactObject(obj)` method the parsed structure and compares your
returned value against the expected compact structure right inside the
harness, walking keys and indices: slots whose values were falsy must be
gone entirely, containers — including ones left completely empty — must
remain in place, and key order never matters. Within valid JSON the falsy
values are `false`, `null`, `0`, and the empty string `""`; values like
`undefined` or `NaN` cannot occur, because they are not valid JSON.

### Example 1

```text
Input: obj = [null, 0, false, 1]
Output: [1]
Explanation: All falsy values have been removed from the array.
```

### Example 2

```text
Input: obj = {"a": null, "b": [false, 1]}
Output: {"b": [1]}
Explanation: obj["a"] and obj["b"][0] had falsy values and were removed.
```

### Example 3

```text
Input: obj = [null, 0, 5, [0], [false, 16]]
Output: [5, [], [16]]
Explanation: obj[0], obj[1], obj[3][0], and obj[4][0] were falsy and
removed.
```

### Constraints

- obj is a valid JSON object
- 2 <= JSON.stringify(obj).length <= 10⁶
