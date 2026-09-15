# Largest Subarray Length K

## Description

An array `A` is larger than an array `B` if, at the first index `i` where
`A[i] != B[i]`, `A[i] > B[i]` — the comparison is decided at the first
position where the two arrays disagree.

For example, with 0-indexing:

```text
[1,3,2,4] > [1,2,2,4], since at index 1, 3 > 2.
[1,4,4,4] < [2,1,1,1], since at index 0, 1 < 2.
```

A subarray is a contiguous subsequence of the array.

Given an integer array `nums` of distinct integers, return the largest
subarray of `nums` with length `k`.

### Example 1

```text
Input: nums = [1,4,5,2,3], k = 3
Output: [5,2,3]
Explanation: The subarrays of size 3 are: [1,4,5], [4,5,2], and [5,2,3].
Of these, [5,2,3] is the largest.
```

### Example 2

```text
Input: nums = [1,4,5,2,3], k = 4
Output: [4,5,2,3]
Explanation: The subarrays of size 4 are: [1,4,5,2] and [4,5,2,3].
Of these, [4,5,2,3] is the largest.
```

### Example 3

```text
Input: nums = [1,4,5,2,3], k = 1
Output: [5]
```

### Constraints

- `1 <= k <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁹`
- All the integers of `nums` are unique.

### Follow-up

What if the integers in `nums` are not distinct?

## Hints

### Hint 1

Search for the largest integer in the range `[0, n - k]`.

### Hint 2

This integer is the first element in the subarray. You should take it with
the `k - 1` elements after it.
