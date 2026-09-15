# Find the Sum of the Power of All Subsequences

## Description

You are given an integer array `nums` of length `n` and a positive integer
`k`.

The power of an array of integers is defined as the number of subsequences
with their sum equal to `k`.

Return the sum of power of all subsequences of `nums`.

Since the answer may be very large, return it modulo `10⁹ + 7`.

### Example 1

```text
Input: nums = [1,2,3], k = 3
Output: 6
Explanation:
There are 5 subsequences of nums with non-zero power:
- The subsequence [1,2,3] has 2 subsequences with sum == 3: [1,2,3] and [1,2,3].
- The subsequence [1,2,3] has 1 subsequence with sum == 3: [1,2,3].
- The subsequence [1,2,3] has 1 subsequence with sum == 3: [1,2,3].
- The subsequence [1,2,3] has 1 subsequence with sum == 3: [1,2,3].
- The subsequence [1,2,3] has 1 subsequence with sum == 3: [1,2,3].
Hence the answer is 2 + 1 + 1 + 1 + 1 = 6.
```

### Example 2

```text
Input: nums = [2,3,3], k = 5
Output: 4
Explanation:
There are 3 subsequences of nums with non-zero power:
- The subsequence [2,3,3] has 2 subsequences with sum == 5: [2,3,3] and [2,3,3].
- The subsequence [2,3,3] has 1 subsequence with sum == 5: [2,3,3].
- The subsequence [2,3,3] has 1 subsequence with sum == 5: [2,3,3].
Hence the answer is 2 + 1 + 1 = 4.
```

### Example 3

```text
Input: nums = [1,2,3], k = 7
Output: 0
Explanation: There exists no subsequence with sum 7. Hence all subsequences of nums have power = 0.
```

### Constraints

- `1 <= n <= 100`
- `1 <= nums[i] <= 10⁴`
- `1 <= k <= 100`

## Hints

### Hint 1

If there is a subsequence of length j with the sum of elements k, it contributes 2ⁿ⁻ʲ to the answer.

### Hint 2

Let dp[i][j] represent the number of subsequences in the subarray nums[0..i] which have a sum of j.

### Hint 3

We can find the dp[i][k] for all 0 < i <= n and multiply them with 2ⁿ⁻ʲ to get final answer.
