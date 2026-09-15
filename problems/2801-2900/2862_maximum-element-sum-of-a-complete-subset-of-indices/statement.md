# Maximum Element-Sum of a Complete Subset of Indices

## Description

You are given a 1-indexed array `nums`. Your task is to select a complete
subset from `nums` where every pair of selected indices multiplied is a perfect
square, i.e. if you select `ai` and `aj`, `i * j` must be a perfect square.

Return the sum of the complete subset with the maximum sum.

### Example 1

```text
Input: nums = [8,7,3,5,7,2,4,9]
Output: 16
Explanation: We select elements at indices 2 and 8, and 2 * 8 is a perfect square.
```

### Example 2

```text
Input: nums = [8,10,3,8,1,13,7,9,4]
Output: 20
Explanation: We select elements at indices 1, 4, and 9. 1 * 4, 1 * 9, 4 * 9 are perfect squares.
```

### Constraints

- `1 <= n == nums.length <= 10^4`
- `1 <= nums[i] <= 10^9`

## Hints

### Hint 1

Define P(x) as the product of primes p with odd exponents in x's factorization. For example, P(18) = 2, P(45) = 5, and P(210) = 210.

### Hint 2

If P(i) = P(j), nums[i] and nums[j] can be grouped together.

### Hint 3

Pick the group with the largest sum.
