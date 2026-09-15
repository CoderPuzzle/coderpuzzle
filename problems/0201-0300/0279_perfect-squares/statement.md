# Perfect Squares

## Description

Given an integer `n`, return the least number of perfect square numbers
that sum to `n`.

A perfect square is an integer that is the square of an integer; in other
words, it is the product of some integer with itself. For example, `1`, `4`,
`9`, and `16` are perfect squares while `3` and `11` are not.

### Example 1

```text
Input: n = 12
Output: 3
Explanation: 12 = 4 + 4 + 4.
```

### Example 2

```text
Input: n = 13
Output: 2
Explanation: 13 = 4 + 9.
```

### Constraints

- `1 <= n <= 10^4`

## Hints

### Hint 1

Let dp[i] be the least number of perfect squares that sum to i; then dp[i] = 1 + min(dp[i - s]) over all squares s <= i.

### Hint 2

Only the squares up to about sqrt(i) can participate, so each state is cheap to compute.

### Hint 3

The recursion bottoms out at dp[0] = 0 and dp[square] = 1.

### Hint 4

Alternatively, view it as a shortest-path/BFS problem from n to 0 with edges subtracting any square.
