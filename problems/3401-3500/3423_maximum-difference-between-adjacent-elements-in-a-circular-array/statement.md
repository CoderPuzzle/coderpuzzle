# Maximum Difference Between Adjacent Elements in a Circular Array

## Description

Given a circular array `nums`, find the maximum absolute difference between
adjacent elements.

Note: In a circular array, the first and last elements are adjacent.

### Example 1

```text
Input: nums = [1,2,4]
Output: 3
Explanation: Because nums is circular, nums[0] and nums[2] are adjacent.
They have the maximum absolute difference of |4 - 1| = 3.
```

### Example 2

```text
Input: nums = [-5,-10,-5]
Output: 5
Explanation: The adjacent elements nums[0] and nums[1] have the maximum
absolute difference of |-5 - (-10)| = 5.
```

### Constraints

- `2 <= nums.length <= 100`
- `-100 <= nums[i] <= 100`

## Hints

### Hint 1

Traverse from the second element to the last element and check the
difference of every adjacent pair.

### Hint 2

The edge case is to check the difference between the first and last
elements.
