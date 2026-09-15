# Find the Maximum Length of a Good Subsequence II

## Description

You are given an integer array `nums` and a non-negative integer `k`. A
sequence of integers `seq` is called good if there are at most `k` indices `i`
in the range `[0, seq.length - 2]` such that `seq[i] != seq[i + 1]`.

Return the maximum possible length of a good subsequence of `nums`.

### Example 1

```text
Input: nums = [1,2,1,1,3], k = 2
Output: 4
Explanation: The maximum length subsequence is [1,2,1,1]. It has 2 indices where adjacent elements differ, which is within the limit k = 2.
```

### Example 2

```text
Input: nums = [1,2,3,4,5,1], k = 0
Output: 2
Explanation: The maximum length subsequence is [1,1]. It has 0 indices where adjacent elements differ, which is within the limit k = 0.
```

### Constraints

- `1 <= nums.length <= 5 * 10³`
- `1 <= nums[i] <= 10⁹`
- `0 <= k <= min(50, nums.length)`

## Hints

### Hint 1

The absolute values in nums do not really matter, so we can remap the set of values to the range [0, n - 1].

### Hint 2

Let dp[i][j] be the length of the longest subsequence ending with value j that has at most i positions such that seq[i] != seq[i + 1].

### Hint 3

For each value x from left to right, update dp[i][x] = max(dp[i][x] + 1, dp[i - 1][y] + 1), where y != x.
