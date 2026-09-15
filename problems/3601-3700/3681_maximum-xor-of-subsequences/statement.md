# Maximum XOR of Subsequences

## Description

You are given an integer array `nums` of length `n`, whose elements are all
non-negative. Choose two subsequences of `nums` — either one may be empty,
and they are allowed to reuse the same positions — each keeping the original
left-to-right order of its elements. Let `X` be the bitwise XOR of every
element in the first subsequence and `Y` the bitwise XOR of every element in
the second; the XOR of an empty subsequence is `0`. Return the maximum value
of `X ^ Y` over all ways to choose the two subsequences.

### Example 1

```text
Input: nums = [1,2,3]
Output: 3
Explanation: Choose the first subsequence [2], whose XOR is 2, and the
second subsequence [2,3], whose XOR is 2 ^ 3 = 1. Then X ^ Y = 2 ^ 1 = 3,
and no other choice of two subsequences reaches a larger value.
```

### Example 2

```text
Input: nums = [5,2]
Output: 7
Explanation: Choose the first subsequence [5], whose XOR is 5, and the
second subsequence [2], whose XOR is 2. Then X ^ Y = 5 ^ 2 = 7, which is
the maximum achievable.
```

### Constraints

- `2 <= n == nums.length <= 10⁵`
- `0 <= nums[i] <= 10⁹`

## Hints

### Hint 1

Build a linear XOR basis from all numbers and take the maximum XOR
achievable from it.
