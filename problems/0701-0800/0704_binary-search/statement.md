# Binary Search

## Description

Given an array of integers `nums` which is sorted in ascending order, and
an integer `target`, write a function to search `target` in `nums`. If
`target` exists, then return its index. Otherwise, return `-1`.

You must write an algorithm with `O(log n)` runtime complexity.

### Example 1

```text
Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
Explanation: 9 exists in nums and its index is 4.
```

### Example 2

```text
Input: nums = [-1,0,3,5,9,12], target = 2
Output: -1
Explanation: 2 does not exist in nums so return -1.
```

### Constraints

- `1 <= nums.length <= 10^4`
- `-10^4 < nums[i], target < 10^4`
- All the integers in `nums` are unique.
- `nums` is sorted in ascending order.

## Hints

### Hint 1

Maintain closed bounds lo and hi into the array and compare the middle element to the target each iteration.

### Hint 2

If the middle element is smaller than the target the answer can only lie to the right; if larger, to the left; if the bounds cross, the target is not present.
