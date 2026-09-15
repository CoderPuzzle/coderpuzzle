# Minimum Operations to Equalize Array

## Description

You are given an integer array `nums` of length `n`.

In one operation you pick any subarray `nums[l...r]` (with `0 <= l <= r <
n`) and overwrite every element inside it with the bitwise AND of all of
its elements.

Return the minimum number of operations required to make all elements of
`nums` equal.

A subarray is a contiguous non-empty run of elements within an array.

### Example 1

```text
Input: nums = [1,2]
Output: 1
Explanation: Choose nums[0...1]; the bitwise AND of 1 and 2 is 0, so the
array becomes [0, 0] with every element equal after a single operation.
```

### Example 2

```text
Input: nums = [5,5,5]
Output: 0
Explanation: The array already consists of equal elements, so no operation
is required.
```

### Constraints

- `1 <= n == nums.length <= 100`
- `1 <= nums[i] <= 10⁵`

## Hints

### Hint 1

If all elements of `nums` are already equal, how many operations are
needed?

### Hint 2

The answer is either 0 or 1.

### Hint 3

It is 0 when all values start out equal, and 1 otherwise, because applying
the operation once to the whole array replaces every element with their
common bitwise AND.
