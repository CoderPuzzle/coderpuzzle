# Find the K-or of an Array

## Description

You are given an integer array nums, and an integer k. Let's introduce K-or
operation by extending the standard bitwise OR. In K-or, a bit position in
the result is set to 1 if at least k numbers in nums have a 1 in that
position.

Return the K-or of nums.

### Example 1

```text
Input: nums = [7,12,9,8,9,15], k = 4
Output: 9
Explanation:
Bit 0 is set in 7, 9, 9, and 15. Bit 3 is set in 12, 9, 8, 9, and 15.
Only bits 0 and 3 qualify. The result is (1001)₂ = 9.
```

### Example 2

```text
Input: nums = [2,12,1,11,4,5], k = 6
Output: 0
Explanation: No bit appears as 1 in all six array numbers, as required for
K-or with k = 6. Thus, the result is 0.
```

### Example 3

```text
Input: nums = [10,8,5,9,11,6,8], k = 1
Output: 15
Explanation: Since k == 1, the 1-or of the array is equal to the bitwise OR
of all its elements. Hence, the answer is 10 OR 8 OR 5 OR 9 OR 11 OR 6 OR
8 = 15.
```

### Constraints

- `1 <= nums.length <= 50`
- `0 <= nums[i] < 2³¹`
- `1 <= k <= nums.length`

## Hints

### Hint 1

Fix a bit from the range [0, 31], then count the number of elements of nums
that have bit set in them.

### Hint 2

bit is set in integer x if and only if 2^bit AND x == 2^bit, where AND is
the bitwise AND operation.
