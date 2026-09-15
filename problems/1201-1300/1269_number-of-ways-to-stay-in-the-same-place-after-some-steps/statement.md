# Number of Ways to Stay in the Same Place After Some Steps

## Description

You have a pointer at index `0` in an array of size `arrLen`. At each step,
you can move 1 position to the left, 1 position to the right in the array, or
stay in the same place (the pointer should not be placed outside the array at
any time).

Given two integers `steps` and `arrLen`, return the number of ways such that
your pointer is still at index `0` after exactly `steps` steps. Since the
answer may be too large, return it modulo `10⁹ + 7`.

### Example 1

```text
Input: steps = 3, arrLen = 2
Output: 4
Explanation: There are 4 different ways to stay at index 0 after 3 steps.
Right, Left, Stay
Stay, Right, Left
Right, Stay, Left
Stay, Stay, Stay
```

### Example 2

```text
Input: steps = 2, arrLen = 4
Output: 2
Explanation: There are 2 different ways to stay at index 0 after 2 steps.
Right, Left
Stay, Stay
```

### Example 3

```text
Input: steps = 4, arrLen = 2
Output: 8
```

### Constraints

- `1 <= steps <= 500`
- `1 <= arrLen <= 10⁶`

## Hints

### Hint 1

Try dynamic programming: dp(pos, steps) is the number of ways to be back at position 0 using exactly steps moves.

### Hint 2

Notice that the computational complexity does not depend on arrLen.
