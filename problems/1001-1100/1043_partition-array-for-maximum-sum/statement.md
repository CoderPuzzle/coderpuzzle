# Partition Array for Maximum Sum

## Description

Given an integer array `arr`, partition the array into (contiguous) subarrays
of length at most `k`. After partitioning, each subarray has their values
changed to become the maximum value of that subarray.

Return the largest sum of the given array after partitioning.

### Example 1

```text
Input: arr = [1,15,7,9,2,5,10], k = 3
Output: 84
Explanation: arr becomes [15,15,15,9,10,10,10]
```

### Example 2

```text
Input: arr = [1,4,1,5,7,3,6,1,9,9,3], k = 4
Output: 83
```

### Example 3

```text
Input: arr = [1], k = 1
Output: 1
```

### Constraints

- `1 <= arr.length <= 500`
- `0 <= arr[i] <= 10^9`
- `1 <= k <= arr.length`

## Hints

### Hint 1

Think dynamic programming: dp[i] is the answer for the prefix arr[0], ..., arr[i-1].

### Hint 2

For j = 1 .. k that keeps everything in bounds, dp[i] is the maximum of dp[i-j] + max(arr[i-j], ..., arr[i-1]) * j.

### Hint 3

Track the running maximum of the last j elements as you extend the final block, so each dp[i] costs only O(k).
