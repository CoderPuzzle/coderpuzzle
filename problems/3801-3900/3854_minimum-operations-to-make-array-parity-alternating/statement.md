# Minimum Operations to Make Array Parity Alternating

## Description

You are given an integer array `nums`.

An array is called parity alternating if for every index `i` where
`0 <= i < n - 1`, `nums[i]` and `nums[i + 1]` have different parity (one is
even and the other is odd).

In one operation, you may choose any index `i` and either increase `nums[i]`
by 1 or decrease `nums[i]` by 1.

Return an integer array `answer` of length 2 where:

- `answer[0]` is the minimum number of operations required to make the array
  parity alternating.
- `answer[1]` is the minimum possible value of `max(nums) - min(nums)` taken
  over all arrays that are parity alternating and can be obtained by
  performing exactly `answer[0]` operations.

An array of length 1 is considered parity alternating.

### Example 1

```text
Input: nums = [-2,-3,1,4]
Output: [2,6]
Explanation:
Applying the following operations:
  Increase nums[2] by 1, resulting in nums = [-2, -3, 2, 4].
  Decrease nums[3] by 1, resulting in nums = [-2, -3, 2, 3].
The resulting array is parity alternating, and the value of
max(nums) - min(nums) = 3 - (-3) = 6 is the minimum possible among all
parity alternating arrays obtainable using exactly 2 operations.
```

### Example 2

```text
Input: nums = [0,2,-2]
Output: [1,3]
Explanation:
Applying the following operation:
  Decrease nums[1] by 1, resulting in nums = [0, 1, -2].
The resulting array is parity alternating, and the value of
max(nums) - min(nums) = 1 - (-2) = 3 is the minimum possible among all
parity alternating arrays obtainable using exactly 1 operation.
```

### Example 3

```text
Input: nums = [7]
Output: [0,0]
Explanation:
No operations are required. The array is already parity alternating, and the
value of max(nums) - min(nums) = 7 - 7 = 0, which is the minimum possible.
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `-10⁹ <= nums[i] <= 10⁹`

## Hints

### Hint 1

A parity alternating array must follow one of two patterns: even, odd,
even, ... or odd, even, odd, ....

### Hint 2

If a position has the wrong parity, its value must be changed by exactly
+/-1 (one operation) to fix the parity.

### Hint 3

For each pattern, count the minimum operations needed to make all positions
match the required parity.

### Hint 4

Among patterns with minimum operations, choose adjustments that minimize
max(nums) - min(nums) while preserving parity.
