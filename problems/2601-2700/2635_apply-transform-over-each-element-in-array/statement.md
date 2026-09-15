# Apply Transform Over Each Element in Array

## Description

Given an integer array arr and a mapping function fn, return a new array
with a transformation applied to each element.

The returned array should be created such that returnedArray[i] =
fn(arr[i], i).

Please solve it without the built-in Array.map method.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only — LeetCode offers no other languages for it. Your submission declares
`class Solution` with the method `solve(mapCase)`, where `mapCase` is a
bundle-provided `MapCase` carrying `.arr`, the integer array under test,
and `.fn`, the callable built from the case's function source. Walk the
array with your own loop and build a new array whose entry at index i is
`fn(arr[i], i)`, always passing both arguments positionally; every
position of the result comes from its own call, whatever value it yields.
The judged answer is exactly that returned array.

### Example 1

```text
Input: arr = [1,2,3], fn = function plusone(n) { return n + 1; }
Output: [2,3,4]
Explanation:
const newArray = map(arr, plusone); // [2,3,4]
The function increases each value in the array by one.
```

### Example 2

```text
Input: arr = [1,2,3], fn = function plusI(n, i) { return n + i; }
Output: [1,3,5]
Explanation: The function increases each value by the index it resides in.
```

### Example 3

```text
Input: arr = [10,20,30], fn = function constant() { return 42; }
Output: [42,42,42]
Explanation: The function always returns 42.
```

### Constraints

- 0 <= arr.length <= 1000
- -10⁹ <= arr[i] <= 10⁹
- fn returns an integer.

## Hints

### Hint 1

Start by creating an array that will eventually be returned.

### Hint 2

Loop over each element in the passed array. Push fn(arr[i]) to the
returned array.
