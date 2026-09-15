# Maximum K to Sort a Permutation

## Description

You are given an integer array `nums` of length `n` that contains every
number in the range `[0, n - 1]` exactly once.

You may swap the elements at two indices `i` and `j`, but a swap is allowed
only when `nums[i] AND nums[j] == k`, where `AND` denotes the bitwise AND
operation and `k` is a non-negative integer fixed in advance. Any number of
such swaps may be performed.

Return the maximum value of `k` such that `nums` can be sorted in
non-decreasing order using only swaps that are allowed for that `k`. If
`nums` is already sorted, return `0`.

### Example 1

```text
Input: nums = [0,3,2,1]
Output: 1
Explanation: Choose k = 1. Swapping nums[1] = 3 and nums[3] = 1 is allowed
because 3 AND 1 = 1, and the array becomes the sorted [0,1,2,3].
```

### Example 2

```text
Input: nums = [0,1,3,2]
Output: 2
Explanation: Choose k = 2. Swapping nums[2] = 3 and nums[3] = 2 is allowed
because 3 AND 2 = 2, and the array becomes the sorted [0,1,2,3].
```

### Example 3

```text
Input: nums = [3,2,1,0]
Output: 0
Explanation: Only k = 0 allows sorting; for every greater k at least one
required swap pairs values whose AND falls short of that k.
```

### Constraints

- `1 <= n == nums.length <= 10⁵`
- `0 <= nums[i] <= n - 1`
- `nums` is a permutation of the integers from `0` to `n - 1`.

## Hints

### Hint 1

Take the bitwise AND of all elements that are not in their correct position.
