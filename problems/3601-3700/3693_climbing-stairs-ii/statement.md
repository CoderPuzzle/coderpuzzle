# Climbing Stairs II

## Description

You are climbing a staircase with `n + 1` steps, numbered from `0` to `n`. You
start on step `0`, having paid nothing so far. You are also given a 1-indexed
integer array `costs` of length `n`, where `costs[i]` is the cost of step `i`.

From step `i` you may jump to step `i + 1`, `i + 2`, or `i + 3`. Jumping from
step `i` onto step `j` costs `costs[j] + (j - i)²` — the price of the step you
land on plus the squared length of the jump.

Return the minimum total cost needed to reach step `n`.

### Example 1

```text
Input: n = 4, costs = [1,2,3,4]
Output: 13
Explanation: One optimal path is 0 -> 1 -> 2 -> 4. The jumps cost
costs[1] + 1² = 2, then costs[2] + 1² = 3, then costs[4] + 2² = 8, and
2 + 3 + 8 = 13.
```

### Example 2

```text
Input: n = 4, costs = [5,1,6,2]
Output: 11
Explanation: One optimal path is 0 -> 2 -> 4. The jumps cost
costs[2] + 2² = 5, then costs[4] + 2² = 6, and 5 + 6 = 11.
```

### Example 3

```text
Input: n = 3, costs = [9,8,3]
Output: 12
Explanation: The single jump 0 -> 3 pays costs[3] + 3² = 3 + 9 = 12.
```

### Constraints

- `1 <= n == costs.length <= 10⁵`
- `1 <= costs[i] <= 10⁴`

## Hints

### Hint 1

Use dynamic programming where `dp[j]` represents the minimum cost to reach
step `j`.

### Hint 2

From step `i` you can jump to `i + 1`, `i + 2`, or `i + 3`; the transition
depends only on the previous three states.

### Hint 3

`dp[j] = min(dp[i] + costs[j] + (j - i)²)` for all `i` in `{j - 1, j - 2, j - 3}`.

### Hint 4

Initialize `dp[0] = 0` and compute up to `dp[n]`; the answer is `dp[n]`.
