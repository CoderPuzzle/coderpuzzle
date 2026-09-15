# Find Nth Smallest Integer With K One Bits

## Description

You are given two positive integers `n` and `k`.

Return an integer denoting the `n`th smallest positive integer that has exactly
`k` ones in its binary representation. It is guaranteed that the answer is
strictly less than `2⁵⁰`.

### Example 1

```text
Input: n = 4, k = 2
Output: 9
Explanation: The 4 smallest positive integers that have exactly k = 2 ones in
their binary representations are:
3 = 11₂
5 = 101₂
6 = 110₂
9 = 1001₂
```

### Example 2

```text
Input: n = 3, k = 1
Output: 4
Explanation: The 3 smallest positive integers that have exactly k = 1 one in
their binary representations are:
1 = 1₂
2 = 10₂
4 = 100₂
```

### Constraints

- `1 <= n <= 2⁵⁰`
- `1 <= k <= 50`
- The answer is strictly less than `2⁵⁰`.

## Hints

### Hint 1

Since the answer is strictly less than `2⁵⁰`, we can iterate over the number of
bits (the length) of the result.

### Hint 2

Precompute binomial coefficients `C(n, k)` to count how many numbers with
exactly k set bits exist for a given length.

### Hint 3

Determine the position of the most significant bit first, then greedily
determine the remaining bits from MSB to LSB based on the remaining count n.
