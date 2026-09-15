# Array Wrapper

## Description

Create a class ArrayWrapper that accepts an array of integers in its
constructor. This class should have two features:

- When two instances of this class are added together with the + operator,
  the resulting value is the sum of all the elements in both arrays.
- When the String() function is called on the instance, it will return a
  comma separated string surrounded by brackets. For example, [1,2,3].

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only — LeetCode offers no other languages for it. Your submission declares
`class Solution` with the method `solve(wrapperCase)`, where `wrapperCase`
is a bundle-provided `WrapperCase` carrying `.arrays`, the constructor
arguments for the ArrayWrapper instance(s) under test, and `.operation`,
either `"Add"` or `"String"`. Implement ArrayWrapper exactly as described —
addition behavior via valueOf, string conversion via toString — then apply
the requested operation: an `"Add"` case provides two or more instances to
be added together left-to-right with +, while a `"String"` case provides
exactly one instance whose string conversion must be returned.

### Example 1

```text
Input: nums = [[1,2],[3,4]], operation = "Add"
Output: 10
Explanation:
const obj1 = new ArrayWrapper([1,2]);
const obj2 = new ArrayWrapper([3,4]);
obj1 + obj2; // 10
```

### Example 2

```text
Input: nums = [[23,98,42,70]], operation = "String"
Output: "[23,98,42,70]"
Explanation:
const obj = new ArrayWrapper([23,98,42,70]);
String(obj); // "[23,98,42,70]"
```

### Example 3

```text
Input: nums = [[],[]], operation = "Add"
Output: 0
Explanation:
const obj1 = new ArrayWrapper([]);
const obj2 = new ArrayWrapper([]);
obj1 + obj2; // 0
```

### Constraints

- `0 <= nums.length <= 1000`
- `0 <= nums[i] <= 1000`
- Note: nums is the array passed to the constructor
