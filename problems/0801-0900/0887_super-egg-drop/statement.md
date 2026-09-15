# Super Egg Drop

## Description

You are given `k` identical eggs and you have access to a building with `n` floors labeled from `1` to `n`.

You know that there exists a floor `f` where `0 <= f <= n` such that any egg dropped at a floor higher than `f` will break, and any egg dropped at or below floor `f` will not break.

Each move, you may take an unbroken egg and drop it from any floor `x` (where `1 <= x <= n`). If the egg breaks, you can no longer use it. However, if the egg does not break, you may reuse it in future moves.

Return the minimum number of moves that you need to determine with certainty what the value of `f` is.

### Example 1

```text
Input: k = 1, n = 2
Output: 2
Explanation: Drop the egg from floor 1. If it breaks, we know that f = 0.
Otherwise, drop the egg from floor 2. If it breaks, we know that f = 1.
If it does not break, then we know f = 2.
Hence, we need at minimum 2 moves to determine with certainty what the value of f is.
```

### Example 2

```text
Input: k = 2, n = 6
Output: 3
```

### Example 3

```text
Input: k = 3, n = 14
Output: 4
```

### Constraints

- `1 <= k <= 100`
- `1 <= n <= 10⁴`

## Hints

### Hint 1

Instead of simulating drops, think about how many floors can be resolved with m moves and e eggs.

### Hint 2

With one move, an egg either breaks (leaving e - 1 eggs and m - 1 moves) or survives (leaving e eggs and m - 1 moves), giving dp[m][e] = dp[m - 1][e - 1] + dp[m - 1][e] + 1.

### Hint 3

Find the smallest m such that dp[m][k] >= n; this m is the answer.
