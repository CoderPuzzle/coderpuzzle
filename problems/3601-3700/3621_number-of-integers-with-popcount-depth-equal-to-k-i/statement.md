# Number of Integers With Popcount-Depth Equal to K I

## Description

You are given two integers `n` and `k`.

For any positive integer `x`, define the following sequence:

`p0 = x`

`pi+1 = popcount(pi)` for all `i >= 0`, where `popcount(y)` is the number
of set bits (1's) in the binary representation of `y`.

This sequence will eventually reach the value 1.

The popcount-depth of `x` is defined as the smallest integer `d >= 0`
such that `pd = 1`.

For example, if `x = 7` (binary representation `"111"`). Then, the
sequence is: 7 → 3 → 2 → 1, so the popcount-depth of 7 is 3.

Your task is to determine the number of integers in the range `[1, n]`
whose popcount-depth is exactly equal to `k`.

Return the number of such integers.

### Example 1

```text
Input: n = 4, k = 1
Output: 2
Explanation: The following integers in the range [1, 4] have
popcount-depth exactly equal to 1:

    x       Binary     Sequence
    2       "10"       2 → 1
    4       "100"      4 → 1

Thus, the answer is 2.
```

### Example 2

```text
Input: n = 7, k = 2
Output: 3
Explanation: The following integers in the range [1, 7] have
popcount-depth exactly equal to 2:

    x       Binary     Sequence
    3       "11"       3 → 2 → 1
    5       "101"      5 → 2 → 1
    6       "110"      6 → 2 → 1

Thus, the answer is 3.
```

### Constraints

- `1 <= n <= 10¹⁵`
- `0 <= k <= 5`

## Hints

### Hint 1

Use digit dynamic programming on the binary representation of n: let dp[pos][ones][tight] = number of ways to choose bits from the most significant down to position pos with exactly ones ones so far, where tight indicates whether you're still matching the prefix of n.

### Hint 2

Precompute depth[j] for all j from 0 to 64 by repeatedly applying popcount(j) until you reach 1.

### Hint 3

After your DP, let dp_final[j] be the count of numbers n that have exactly j ones; the answer is the sum of all dp_final[j] for which depth[j] == k.
