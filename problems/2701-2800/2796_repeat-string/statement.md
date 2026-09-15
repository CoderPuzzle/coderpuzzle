# Repeat String

## Description

Write code that enhances all strings such that you can call the
string.replicate(x) method on any string and it will return repeated string
x times. Try to implement it without using the built-in method
string.repeat.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only — LeetCode offers no other languages for it. Your submission declares
`class Solution` with the method `solve(strCase)`, where `strCase` is a
bundle-provided `StrCase` carrying `.str`, the string under test, and
`.times`, the count replicate(x) must return it repeated by. Enhance
`String.prototype` with `replicate`, then return the result of calling
`String.prototype.replicate.call(strCase.str, strCase.times)` — `.str`
repeated `.times` times.

### Example 1

```text
Input: str = "hello", times = 2
Output: "hellohello"
Explanation: "hello" is repeated 2 times
```

### Example 2

```text
Input: str = "code", times = 3
Output: "codecodecode"
Explanation: "code" is repeated 3 times
```

### Example 3

```text
Input: str = "js", times = 1
Output: "js"
Explanation: "js" is repeated 1 time
```

### Constraints

- 1 <= times <= 10⁵
- 1 <= str.length <= 1000

### Follow up

Let's assume, for the sake of simplifying analysis, that concatenating
strings is a constant time operation O(1). With this assumption in mind,
can you write an algorithm with a runtime complexity of O(log n)?
