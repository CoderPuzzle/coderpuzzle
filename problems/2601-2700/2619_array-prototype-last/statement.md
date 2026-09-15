# Array Prototype Last

## Description

Write code that enhances all arrays such that you can call the array.last()
method on any array and it will return the last element. If there are no
elements in the array, it should return -1.

You may assume the array is the output of JSON.parse.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only — LeetCode offers no other languages for it. Your submission declares
`class Solution` with the method `solve(lastCase)`, where `lastCase` is a
bundle-provided `LastCase` carrying `.nums`, the case's array. Enhance
`Array.prototype` with `last`, then call `lastCase.collect()` once — the
driver validates your enhancement against fresh probe arrays of its own,
so a submission that never defined `last` fails right there, and its
verdict (read after `solve` returns) reports three probes: the case array
itself, an untouched clone of it, and an empty array. The judged answer is
exactly that three-element transcript. Because `-1` doubles as the
empty-array sentinel here, callers cannot distinguish a genuine last
element of -1 from an empty input; the statement's rule stands as written.

### Example 1

```text
Input: nums = [null, {}, 3]
Output: 3
Explanation: Calling nums.last() should return the last element: 3.
```

### Example 2

```text
Input: nums = []
Output: -1
Explanation: Because there are no elements, return -1.
```

### Constraints

- arr is a valid JSON array
- 0 <= arr.length <= 1000

## Hints

### Hint 1

Inside the Array.prototype.last function body, you have access to the "this" keyword. "this" is equal to the contents of the array in this case.

### Hint 2

You can access elements in the array via this[0], this[1], etc. You can also access properties and method like this.length, this.forEach, etc.
