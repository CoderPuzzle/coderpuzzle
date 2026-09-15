# Array Upper Bound

## Description

Write code that enhances all arrays such that you can call the upperBound()
method on any array and it will return the last index of a given target
number. nums is a sorted ascending array of numbers that may contain
duplicates. If the target number is not found in the array, return -1.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only — LeetCode offers no other languages for it. Your submission declares
`class Solution` with the method `solve(arrCase)`, where `arrCase` is a
bundle-provided `ArrCase` carrying `.nums`, the sorted array under test, and
`.target`, the value whose last occurrence must be reported. Enhance
`Array.prototype` with `upperBound`, then return the result of calling
`arrCase.nums.upperBound(arrCase.target)` — the last index of `target`, or
-1 when it is absent.

### Example 1

```text
Input: nums = [3,4,5], target = 5
Output: 2
Explanation: Last index of target value is 2
```

### Example 2

```text
Input: nums = [1,4,5], target = 2
Output: -1
Explanation: Because there is no digit 2 in the array, return -1.
```

### Example 3

```text
Input: nums = [3,4,6,6,6,6,7], target = 6
Output: 5
Explanation: Last index of target value is 5
```

### Constraints

- 1 <= nums.length <= 10⁴
- -10⁴ <= nums[i], target <= 10⁴
- nums is sorted in ascending order.

### Follow up

Can you write an algorithm with O(log n) runtime complexity?

## Hints

### Hint 1

Inside the Array.prototype.upperBound function you have access to the "this"
keyword. You can access array elements, values, and methods. For example
"this[0]", "this[1]", "this.length", "this.map()", etc.

### Hint 2

The most efficient way to solve this problem is with binary search.

### Hint 3

Choose the middle element and check if it's less than or equal to the goal
value. If so, you can rule out the left side of the array.
