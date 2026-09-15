# Maximize Fixed Points After Deletions

## Description

You are given an integer array `nums`.

A position `i` is called a fixed point if `nums[i] == i`.

You are allowed to delete any number of elements (including zero) from the
array. After each deletion, the remaining elements shift left, and indices are
reassigned starting from 0.

Return an integer denoting the maximum number of fixed points that can be
achieved after performing any number of deletions.

### Example 1

```text
Input: nums = [0,2,1]
Output: 2
Explanation: Delete nums[1] = 2. The array becomes [0, 1].
Now, nums[0] = 0 and nums[1] = 1, so both indices are fixed points.
Thus, the answer is 2.
```

### Example 2

```text
Input: nums = [3,1,2]
Output: 2
Explanation: Do not delete any elements. The array remains [3, 1, 2].
Here, nums[1] = 1 and nums[2] = 2, so these indices are fixed points.
Thus, the answer is 2.
```

### Example 3

```text
Input: nums = [1,0,1,2]
Output: 3
Explanation: Delete nums[0] = 1. The array becomes [0, 1, 2].
Now, nums[0] = 0, nums[1] = 1, and nums[2] = 2, so all indices are fixed
points.
Thus, the answer is 3.
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `0 <= nums[i] <= 10⁵`

## Hints

### Hint 1

An element can become a fixed point only if i >= nums[i].

### Hint 2

Two indices i and j can both be fixed points if they satisfy the first
condition and i - nums[i] .

### Hint 3

Find the longest possible increasing subsequence from those indices.
