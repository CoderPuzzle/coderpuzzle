# Trionic Array I

## Description

An array is **trionic** when it rises, falls, then rises again across its
full length. Call an array `nums` of length `n` trionic if there exist
indices `p` and `q`, with `0 < p < q < n - 1`, such that all of the
following hold (each range includes both of its endpoints):

- `nums[0..p]` is strictly increasing,
- `nums[p..q]` is strictly decreasing,
- `nums[q..n-1]` is strictly increasing.

Given an integer array `nums`, return `true` if `nums` is trionic, or
`false` otherwise.

### Example 1

```text
Input: nums = [1,3,5,4,2,6]
Output: true
Explanation: Pick p = 2 and q = 4.
- nums[0..2] = [1,3,5] is strictly increasing (1 < 3 < 5).
- nums[2..4] = [5,4,2] is strictly decreasing (5 > 4 > 2).
- nums[4..5] = [2,6] is strictly increasing (2 < 6).
```

### Example 2

```text
Input: nums = [2,1,3]
Output: false
Explanation: With n = 3 no indices p and q satisfy 0 < p < q < n - 1,
so the three stretches cannot be formed.
```

### Constraints

- `3 <= n <= 100`
- `-1000 <= nums[i] <= 1000`

## Hints

### Hint 1

Trying every candidate pair of cut points `(p, q)` and checking the three
stretches directly is well within reach at these limits.
