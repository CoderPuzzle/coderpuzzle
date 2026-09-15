# Sum of Floored Pairs

## Description

Given an integer array `nums`, return the sum of
`floor(nums[i] / nums[j])` for all pairs of indices `0 <= i, j < nums.length`
in the array. Since the answer may be too large, return it **modulo**
`10^9 + 7`.

The `floor()` function returns the integer part of the division.

### Example 1

```text
Input: nums = [2,5,9]
Output: 10
Explanation:
floor(2 / 5) = floor(2 / 9) = floor(5 / 9) = 0
floor(2 / 2) = floor(5 / 5) = floor(9 / 9) = 1
floor(5 / 2) = 2
floor(9 / 2) = 4
floor(9 / 5) = 1
We calculate the floor of the division for every pair of indices in the array then sum them up.
```

### Example 2

```text
Input: nums = [7,7,7,7,7,7,7]
Output: 49
```

### Constraints

- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^5`

## Hints

### Hint 1

Find the frequency (number of occurrences) of all elements in the array, and build a prefix sum over those frequencies.

### Hint 2

For each value y present, iterate over its multiples m and use the prefix sum to count how many elements are at least m*y; floor(x/y) equals the number of multiples of y that are at most x.
