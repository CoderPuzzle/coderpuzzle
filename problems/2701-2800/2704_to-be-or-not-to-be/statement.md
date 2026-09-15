# To Be Or Not To Be

## Description

Write a function expect that helps developers test their code. It should
take in any value val and return an object with the following two
functions.

- toBe(val) accepts another value and returns true if the two values ===
  each other. If they are not equal, it should throw an error "Not Equal".
- notToBe(val) accepts another value and returns true if the two values !==
  each other. If they are equal, it should throw an error "Equal".

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only — LeetCode offers no other languages for it. Your submission declares
the function expect(val) plus a class Solution whose run(expectCase) hands
that function to the bundle-provided case carrier:
`expectCase.drive(expect)`. Each case's func is a thunk source such as
`() => expect(5).toBe(5)`; the driver evaluates it with your expect in
scope, runs it, and records the outcome — `{"value": true}` when the thunk
returns normally, `{"error": "<message>"}` when it throws. That recorded
object is the judged answer, compared exactly.

### Example 1

```text
Input: func = () => expect(5).toBe(5)
Output: {"value": true}
Explanation: 5 === 5 so this expression returns true.
```

### Example 2

```text
Input: func = () => expect(5).toBe(null)
Output: {"error": "Not Equal"}
Explanation: 5 !== null so this expression throw the error "Not Equal".
```

### Example 3

```text
Input: func = () => expect(5).notToBe(null)
Output: {"value": true}
Explanation: 5 !== null so this expression returns true.
```

### Constraints

- val and the value passed to toBe or notToBe may be of any type —
  numbers, strings, booleans, null, undefined, objects, or arrays.
- The comparison is JavaScript's strict equality: no type coercion, and
  two distinct objects are never equal even when their contents match.
