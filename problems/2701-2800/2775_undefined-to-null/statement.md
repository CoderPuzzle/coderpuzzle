# Undefined to Null

## Description

Given a deeply nested object or array obj, return the object obj with any
undefined values replaced by null.

undefined values are handled differently than null values when objects are
converted to a JSON string using JSON.stringify(). This function helps ensure
serialized data is free of unexpected errors.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript only —
LeetCode offers no other languages for it. Your entry point is a class
`Solution` with `run(caseRunner)`; inside it, call `caseRunner.check(this)`.
The case runner then hands your `undefinedToNull(obj)` method a freshly built
live object: real objects and arrays in which selected slots hold genuine
`undefined` values — own properties throughout, arrays always dense (an
`undefined` element occupies its index; nothing is sparse). Return obj with
every such undefined replaced by null; transforming a deep copy or rebuilding
the structure fresh are both fine. Judging compares your returned value
against the expected structure inside the harness itself, walking keys and
indices: a slot that is merely absent, a slot still holding `undefined`, and
an explicit `null` are three different outcomes, and pre-existing null values
must survive untouched.

### Example 1

```text
Input: obj = {"a": undefined, "b": 3}
Output: {"a": null, "b": 3}
Explanation: The value for obj.a has been changed from undefined to null
```

### Example 2

```text
Input: obj = {"a": undefined, "b": ["a", undefined]}
Output: {"a": null,"b": ["a", null]}
Explanation: The values for obj.a and obj.b[1] have been changed from undefined to null
```

### Constraints

- obj is a valid JSON object or array
- 2 <= JSON.stringify(obj).length <= 10⁵
