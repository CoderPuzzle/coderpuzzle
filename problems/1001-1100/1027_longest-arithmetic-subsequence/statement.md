# Longest Arithmetic Subsequence

## Description

Given an array `nums` of integers, return the length of the longest arithmetic
subsequence in `nums`.

Note that:

- A subsequence is an array that can be derived from another array by deleting
  some or no elements without changing the order of the remaining elements.
- A sequence `seq` is arithmetic if `seq[i + 1] - seq[i]` are all the same
  value (for `0 <= i < seq.length - 1`).

### Example 1

```text
Input: nums = [3,6,9,12]
Output: 4
Explanation: The whole array is an arithmetic sequence with steps of length = 3.
```

### Example 2

```text
Input: nums = [9,4,7,2,10]
Output: 3
Explanation: The longest arithmetic subsequence is [4,7,10].
```

### Example 3

```text
Input: nums = [20,1,15,3,10,5,8]
Output: 4
Explanation: The longest arithmetic subsequence is [20,15,10,5].
```

### Constraints

- `2 <= nums.length <= 1000`
- `0 <= nums[i] <= 500`

## Hints

### Hint 1

For each index i, track the length of the longest arithmetic subsequence ending at i, keyed by common difference.

### Hint 2

When processing nums[i], extend the best chain ending at any earlier index j using d = nums[i] - nums[j].

### Hint 3

A dictionary of differences per index keeps the DP efficient; the answer is the maximum length seen anywhere.
