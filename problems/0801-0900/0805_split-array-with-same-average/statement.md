# Split Array With Same Average

## Description

You are given an integer array `nums`.

You should move each element of `nums` into one of the two arrays `A` and `B`,
such that `A` and `B` are non-empty and `average(A) == average(B)`.

Return `true` if it is possible to achieve that and `false` otherwise.

Note that for an array `arr`, `average(arr)` is the sum of all the elements of
`arr` over the length of `arr`.

### Example 1

```text
Input: nums = [1,2,3,4,5,6,7,8]
Output: true
Explanation: We can split the array into [1,4,5,8] and [2,3,6,7], and both of them
have an average of 4.5.
```

### Example 2

```text
Input: nums = [3,1]
Output: false
```

### Constraints

- `1 <= nums.length <= 30`
- `0 <= nums[i] <= 10⁴`

## Hints

### Hint 1

If two non-empty subarrays have equal averages, then both share the same average as the entire array, `total / n`.

### Hint 2

A chosen subarray of size `s` must therefore have sum `total * s / n`, so only sizes `s` with `(total * s) % n == 0` need to be considered.

### Hint 3

With `n` up to 30, split the array in half and enumerate every subset sum of each half, grouped by subset size, then combine the two halves.

### Hint 4

When combining, for each split of the target size between the halves, check whether a left subset of size `s1` and a right subset of size `s2` add up to the required sum.
