# Arithmetic Slices II - Subsequence

## Description

Given an integer array `nums`, return the number of all the arithmetic subsequences of `nums`.

A sequence of numbers is called arithmetic if it consists of at least three elements and if the difference between any two consecutive elements is the same.

For example, `[1, 3, 5, 7, 9]`, `[7, 7, 7, 7]`, and `[3, -1, -5, -9]` are arithmetic sequences. For example, `[1, 1, 2, 5, 7]` is not an arithmetic sequence.

A subsequence of an array is a sequence that can be formed by removing some elements (possibly none) of the array.

For example, `[2,5,10]` is a subsequence of `[1,2,1,2,4,1,5,10]`.

The test cases are generated so that the answer fits in a 32-bit integer.

### Example 1

```text
Input: nums = [2,4,6,8,10]
Output: 7
Explanation: All arithmetic subsequence slices are:
[2,4,6]
[4,6,8]
[6,8,10]
[2,4,6,8]
[4,6,8,10]
[2,4,6,8,10]
[2,6,10]
```

### Example 2

```text
Input: nums = [7,7,7,7,7]
Output: 16
Explanation: Any subsequence of this array is arithmetic.
```

### Constraints

- `1 <= nums.length <= 1000`
- `-2³¹ <= nums[i] <= 2³¹ - 1`

## Hints

### Hint 1

Enumerating all subsequences by extending pairs of indices is too slow; think about what information an ending index needs to remember.

### Hint 2

For each position i, track how many arithmetic subsequences of length at least 2 end at i for each common difference.

### Hint 3

When appending nums[i] to a subsequence that ends at nums[j], the difference is fixed, so the existing count extends directly and contributes a new slice of length at least 3.
