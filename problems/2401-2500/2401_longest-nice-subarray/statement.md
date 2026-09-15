# Longest Nice Subarray

## Description

You are given an array `nums` consisting of positive integers.

We call a subarray of `nums` **nice** if the bitwise AND of every pair of
elements that are in different positions in the subarray is equal to `0`.

Return the length of the longest nice subarray.

A subarray is a contiguous part of an array.

Note that subarrays of length `1` are always considered nice.

### Example 1

```text
Input: nums = [1,3,8,48,10]
Output: 3
Explanation: The longest nice subarray is [3,8,48]. This subarray satisfies the conditions:
- 3 AND 8 = 0.
- 3 AND 48 = 0.
- 8 AND 48 = 0.
It can be proven that no longer nice subarray can be obtained, so we return 3.
```

### Example 2

```text
Input: nums = [3,1,5,11,13]
Output: 1
Explanation: The length of the longest nice subarray is 1. Any subarray of
length 1 can be chosen.
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁹`

## Hints

### Hint 1

Keep a sliding window whose combined bitwise OR stays disjoint from the next incoming element.

### Hint 2

If two numbers have bitwise AND equal to zero, they have no common set bit; a number up to 10^9 has at most 30 bits, so a nice subarray can never exceed length 30.

### Hint 3

When the incoming element conflicts with the window, shrink from the left, removing elements from the window's OR, until it fits.
