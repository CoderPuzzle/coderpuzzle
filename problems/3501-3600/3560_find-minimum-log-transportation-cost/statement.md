# Find Minimum Log Transportation Cost

## Description

You are given integers `n`, `m`, and `k`.

There are two logs of lengths `n` and `m` units, which need to be
transported in three trucks where each truck can carry one log with length
at most `k` units.

You may cut the logs into smaller pieces, where the cost of cutting a log
of length `x` into logs of length `len1` and `len2` is
`cost = len1 * len2` such that `len1 + len2 = x`.

Return the minimum total cost to distribute the logs onto the trucks. If
the logs don't need to be cut, the total cost is 0.

### Example 1

```text
Input: n = 6, m = 5, k = 5
Output: 5
Explanation:
Cut the log with length 6 into logs with length 1 and 5, at a cost equal to 1 * 5 == 5. Now the three logs of length 1, 5, and 5 can fit in one truck each.
```

### Example 2

```text
Input: n = 4, m = 4, k = 6
Output: 0
Explanation:
The two logs can fit in the trucks already, hence we don't need to cut the logs.
```

### Constraints

- `2 <= k <= 10⁵`
- `1 <= n, m <= 2 * k`
- The input is generated such that it is always possible to transport the
  logs.

## Hints

### Hint 1

If both logs have a length less than k, cost is zero.

### Hint 2

Can we transport the logs if both logs have length greater than k.

### Hint 3

Otherwise, pick the log with greater length and cut it into logs with
lengths len1 and len2 such that len1 + len2 equals the original length.

### Hint 4

To minimize the cost len1 * len2, choose len1 and len2 as far apart as
possible (e.g. 1 and length−1).
