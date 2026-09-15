# Count Array Pairs Divisible by K

## Description

Given a 0-indexed integer array `nums` of length `n` and an integer `k`,
return the number of pairs `(i, j)` such that:

- `0 <= i < j <= n - 1` and
- `nums[i] * nums[j]` is divisible by `k`.

### Example 1

```text
Input: nums = [1,2,3,4,5], k = 2
Output: 7
Explanation:
The 7 pairs of indices whose corresponding products are divisible by 2 are
(0, 1), (0, 3), (1, 2), (1, 3), (1, 4), (2, 3), and (3, 4).
Their products are 2, 4, 6, 8, 10, 12, and 20 respectively.
Other pairs such as (0, 2) and (2, 4) have products 3 and 15 respectively, which are not divisible by 2.
```

### Example 2

```text
Input: nums = [1,2,3,4], k = 5
Output: 0
Explanation: There does not exist any pair of indices whose corresponding product is divisible by 5.
```

### Constraints

- `1 <= nums.length <= 10^5`
- `1 <= nums[i], k <= 10^5`

## Hints

### Hint 1

For any element in the array, what is the smallest number it should be multiplied with such that the product is divisible by k?

### Hint 2

The smallest number which should be multiplied with nums[i] so that the product is divisible by k is k / gcd(k, nums[i]).

### Hint 3

Group elements by gcd(num, k) — every distinct gcd is a divisor of k, so pairing the divisor groups is efficient.
