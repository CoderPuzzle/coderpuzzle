# Maximum Value at a Given Index in a Bounded Array

## Description

You are given three positive integers: `n`, `index`, and `maxSum`. You want to
construct an array `nums` (0-indexed) that satisfies the following conditions:

- `nums.length == n`
- `nums[i]` is a positive integer where `0 <= i < n`.
- `abs(nums[i] - nums[i+1]) <= 1` where `0 <= i < n-1`.
- The sum of all the elements of `nums` does not exceed `maxSum`.
- `nums[index]` is maximized.

Return `nums[index]` of the constructed array.

Note that `abs(x)` equals `x` if `x >= 0`, and `-x` otherwise.

### Example 1

```text
Input: n = 4, index = 2, maxSum = 6
Output: 2
Explanation: nums = [1,2,2,1] is one array that satisfies all the conditions.
There are no arrays that satisfy all the conditions and have nums[2] == 3, so
2 is the maximum nums[2].
```

### Example 2

```text
Input: n = 6, index = 1, maxSum = 10
Output: 3
```

### Constraints

- `1 <= n <= maxSum <= 10⁹`
- `0 <= index < n`

## Hints

### Hint 1

What if the problem was instead determining if you could generate a valid array
with `nums[index] == target`?

### Hint 2

To generate the array, set `nums[index]` to `target`, `nums[index-i]` to
`target-i`, and `nums[index+i]` to `target-i`. Then, this will give the minimum
possible sum, so check if the sum is less than or equal to `maxSum`.

### Hint 3

`n` is too large to actually generate the array, so you can use the formula
`1 + 2 + ... + n = n * (n+1) / 2` to quickly find the sum of `nums[0...index]`
and `nums[index...n-1]`.

### Hint 4

Binary search for the target. If it is possible, then move the lower bound up.
Otherwise, move the upper bound down.
