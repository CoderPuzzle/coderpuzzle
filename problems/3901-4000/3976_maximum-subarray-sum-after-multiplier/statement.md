# Maximum Subarray Sum After Multiplier

## Description

You are given an integer array `nums` and a positive integer `k`.

You must choose exactly one subarray of `nums` and perform exactly one of the
following operations:

- Multiply each number in the chosen subarray by `k`.
- Divide each number in the chosen subarray by `k`.
    - When dividing a positive number by `k`, use the floor value of the
      division result.
    - When dividing a negative number by `k`, use the ceiling value of the
      division result.

Return the maximum possible sum of a non-empty subarray in the resulting
array.

Note that the subarray chosen for the operation and the subarray chosen for
the sum may be different.

### Example 1

```text
Input: nums = [1,-2,3,4,-5], k = 2
Output: 14
Explanation:
    Multiply each number in the subarray [3, 4] by 2.
    This results in nums = [1, -2, 6, 8, -5].
    The subarray with the largest sum is [6, 8], so the output is
    6 + 8 = 14.
```

### Example 2

```text
Input: nums = [-5,-4,-3], k = 2
Output: -1
Explanation:
    Divide each number in the subarray [-3] by 2.
    This results in nums = [-5, -4, -1].
    The subarray with the largest sum is [-1], so the output is -1.
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `-10⁵ <= nums[i] <= 10⁵`
- `1 <= k <= 10⁵`

## Hints

### Hint 1

Use a Kadane-style dynamic programming where the maximum-sum subarray is
built from left to right.

### Hint 2

Keep states for four cases: no operation used yet, currently multiplying,
currently dividing, and operation already finished.

### Hint 3

The divide value should be computed as truncation toward zero: floor for
positive numbers and ceiling for negative numbers.

### Hint 4

The answer is the maximum value over all states and all ending positions.
