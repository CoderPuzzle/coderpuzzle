# Transform Array to All Equal Elements

## Description

You are given an integer array `nums` of size `n` containing only 1 and
-1, and an integer `k`.

You can perform the following operation at most `k` times:

- Choose an index `i` (`0 <= i < n - 1`), and multiply both `nums[i]` and
  `nums[i + 1]` by `-1`.

Note that you can choose the same index `i` more than once in different
operations.

Return true if it is possible to make all elements of the array equal
after at most `k` operations, and false otherwise.

### Example 1

```text
Input: nums = [1,-1,1,-1,1], k = 3
Output: true
Explanation: We can make all elements in the array equal in 2 operations
as follows:
Choose index i = 1, and multiply both nums[1] and nums[2] by -1. Now
nums = [1,1,-1,-1,1].
Choose index i = 2, and multiply both nums[2] and nums[3] by -1. Now
nums = [1,1,1,1,1].
```

### Example 2

```text
Input: nums = [-1,-1,-1,1,1,1], k = 5
Output: false
Explanation: It is not possible to make all array elements equal in at
most 5 operations.
```

### Constraints

- `1 <= n == nums.length <= 10⁵`
- `nums[i]` is either -1 or 1.
- `1 <= k <= n`

## Hints

### Hint 1

Try converting all elements to 1 and separately to -1. For each case, calculate the minimum number of operations needed.

### Hint 2

Use a greedy approach: scan the array from left to right and apply an operation only when needed to fix mismatches.
