# Infinite Method Object

## Description

Write a function that returns an infinite-method object.

An infinite-method object is defined as an object that allows you to call
any method and it will always return the name of the method.

For example, if you execute obj.abc123(), it will return "abc123".

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only — LeetCode offers no other languages for it. Your submission declares
`class Solution` with the method `callMethod(methodCase)`, where
`methodCase` is a bundle-provided `MethodCase` carrying `.method`, the name
of the method under test. Declare `createInfiniteObject()` as well, then
return the result of calling the method named by `methodCase.method` on an
object from `createInfiniteObject()` — the method's own name.

### Example 1

```text
Input: method = "abc123"
Output: "abc123"
Explanation:
const obj = createInfiniteObject();
obj['abc123'](); // "abc123"
The returned string should always match the method name.
```

### Example 2

```text
Input: method = ".-qw73n|^2It"
Output: ".-qw73n|^2It"
Explanation: The returned string should always match the method name.
```

### Constraints

- 0 <= method.length <= 1000

## Hints

### Hint 1

Javascript has the concept of Proxy. That concept is critical to this problem.

### Hint 2

Override all "get" for the object. Return a function instead.

### Hint 3

That function should return the "prop", i.e. the method name.
