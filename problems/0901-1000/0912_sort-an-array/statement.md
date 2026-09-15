# Sort an Array

## Description

Given an integer array `nums`, sort it in ascending order and return it.

Note: You must solve it without any built-in or library sort routine, in
`O(n log n)` time and with the smallest space complexity possible — a
hand-written merge sort or heap sort meets both bounds. The judge sees only
the returned array, and ascending order pins the answer exactly, so any
correct hand-written sort produces it.

### Example 1

```text
Input: nums = [5,2,3,1]
Output: [1,2,3,5]
Explanation: after sorting, the positions of some numbers are not changed
(for example, 2 and 3), while the positions of other numbers are changed
(for example, 1 and 5).
```

### Example 2

```text
Input: nums = [5,1,1,2,0,0]
Output: [0,0,1,1,2,5]
Explanation: note that the values of nums are not necessarily unique.
```

### Constraints

- `1 <= nums.length <= 5 * 10⁴`
- `-5 * 10⁴ <= nums[i] <= 5 * 10⁴`
