# Shortest Subarray with Sum at Least K

## Description

Given an integer array `nums` and an integer `k`, return the length of the shortest non-empty subarray of `nums` with a sum of at least `k`. If there is no such subarray, return `-1`.

A subarray is a contiguous part of an array.

### Example 1

```text
Input: nums = [1], k = 1
Output: 1
```

### Example 2

```text
Input: nums = [1,2], k = 4
Output: -1
```

### Example 3

```text
Input: nums = [2,-1,2], k = 3
Output: 3
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `-10⁵ <= nums[i] <= 10⁵`
- `1 <= k <= 10⁹`

## Hints

### Hint 1

Express the sum of any subarray as a difference of two prefix sums.

### Hint 2

For each prefix sum p, the best candidate start is the earliest previous prefix whose value is at most p - k.

### Hint 3

A monotonic deque that keeps prefix indices in increasing order of both index and value lets you sweep once in O(n).
