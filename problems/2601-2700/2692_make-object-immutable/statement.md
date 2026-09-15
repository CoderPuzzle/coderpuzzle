# Make Object Immutable

## Description

Write a function that takes an object obj and returns a new immutable
version of this object.

An immutable object is an object that can't be altered and will throw an
error if any attempt is made to alter it.

There are three types of error messages that can be produced from this new
object.

- Attempting to modify a key on the object will result in this error
  message: `Error Modifying: ${key}`.
- Attempting to modify an index on an array will result in this error
  message: `Error Modifying Index: ${index}`.
- Attempting to call a method that mutates an array will result in this
  error message: `Error Calling Method: ${methodName}`. You may assume the
  only methods that can mutate an array are ['pop', 'push', 'shift',
  'unshift', 'splice', 'sort', 'reverse'].

obj is a valid JSON object or array, meaning it is the output of
JSON.parse().

Note that a string literal should be thrown, not an Error.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only — LeetCode offers no other languages for it. Your submission declares
the function `makeImmutable(obj)` plus a class `Solution` whose
`run(objCase)` hands that function to the bundle-provided case carrier:
`objCase.drive(makeImmutable)`. Each case carries a JSON value `obj` and an
arrow-function source `fn` receiving the immutable view of that `obj`; the
driver builds the view with your function, evaluates `fn` against it, and
records the outcome — `{"value": <v>}` when `fn` returns normally,
`{"error": "<message>"}` when it throws. That recorded object is the judged
answer, compared exactly, so the thrown string must be byte-exact.

### Example 1

```text
Input:
obj = {
  "x": 5
}
fn = (obj) => {
  obj.x = 5;
  return obj.x;
}
Output: {"error": "Error Modifying: x"}
Explanation: Attempting to modify a key on an object resuts in a thrown
error. Note that it doesn't matter that the value was set to the same
value as it was before.
```

### Example 2

```text
Input:
obj = [1, 2, 3]
fn = (arr) => {
  arr[1] = {};
  return arr[2];
}
Output: {"error": "Error Modifying Index: 1"}
Explanation: Attempting to modify an array results in a thrown error.
```

### Example 3

```text
Input:
obj = {
  "arr": [1, 2, 3]
}
fn = (obj) => {
  obj.arr.push(4);
  return 42;
}
Output: {"error": "Error Calling Method: push"}
Explanation: Calling a method that can result in a mutation results in a
thrown error.
```

### Example 4

```text
Input:
obj = {
  "x": 2,
  "y": 2
}
fn = (obj) => {
  return Object.keys(obj);
}
Output: {"value": ["x", "y"]}
Explanation: No mutations were attempted so the function returns as
normal.
```

### Constraints

- obj is a valid JSON object or array
- 2 <= JSON.stringify(obj).length <= 10⁵

## Hints

### Hint 1

Javascript has the concept of Proxy. That concept is critical to this
problem.

### Hint 2

Recursively use proxy so that the user of the object is only able to
access a proxy object.

### Hint 3

Override how set works. It should throw the correct error instead of
actually setting a value.
