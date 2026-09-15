# Binary Subarrays With Sum

## Description

Given a binary array `nums` and an integer `goal`, return the number of
non-empty subarrays with a sum equal to `goal`.

A subarray is a contiguous part of the array.

### Example 1

```text
Input: nums = [1,0,1,0,1], goal = 2
Output: 4
Explanation: The 4 subarrays with a sum of 2 are [1,0,1], [1,0,1,0],
[0,1,0,1], and [1,0,1].
```

### Example 2

```text
Input: nums = [0,0,0,0,0], goal = 0
Output: 15
```

### Constraints

- `1 <= nums.length <= 3 * 10⁴`
- `nums[i]` is either `0` or `1`.
- `0 <= goal <= nums.length`

## Hints

### Hint 1

Can you transform the problem into finding two prefix sums whose difference
equals `goal`?

### Hint 2

While iterating through the array, keep track of how many times each prefix
sum has appeared so far.

### Hint 3

If the current prefix sum is `curr`, how many previous prefix sums equal to
`curr - goal` exist?
