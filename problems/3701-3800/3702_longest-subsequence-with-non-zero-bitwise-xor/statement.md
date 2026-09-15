# Longest Subsequence With Non-Zero Bitwise XOR

## Description

You are given an integer array `nums`.

A subsequence of `nums` is obtained by keeping any subset of its elements in
their original order; its bitwise XOR is the value `XOR` of those kept
elements. Return the length of the longest subsequence whose bitwise XOR is
non-zero, or `0` if no subsequence of `nums` has a non-zero bitwise XOR.

### Example 1

```text
Input: nums = [1,2,3]
Output: 2
Explanation: The subsequence [2,3] has bitwise XOR 2 XOR 3 = 1, which is non-zero.
No longer subsequence qualifies: the whole array's XOR is 1 XOR 2 XOR 3 = 0.
```

### Example 2

```text
Input: nums = [2,3,4]
Output: 3
Explanation: The entire array already works: 2 XOR 3 XOR 4 = 5, which is non-zero.
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `0 <= nums[i] <= 10⁹`

## Hints

### Hint 1

What happens if you take the entire array?

### Hint 2

If the XOR of the entire array is 0, can removing one element help?

### Hint 3

What if all elements are 0?
