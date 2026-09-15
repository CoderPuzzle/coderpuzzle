# Reaching Points

## Description

Given four integers `sx`, `sy`, `tx`, and `ty`, return `true` if it is possible to convert the point `(sx, sy)` to the point `(tx, ty)` through some operations, or `false` otherwise.

The allowed operation on some point `(x, y)` is to convert it to either `(x, x + y)` or `(x + y, y)`.

### Example 1

```text
Input: sx = 1, sy = 1, tx = 3, ty = 5
Output: true
Explanation:
One series of moves that transforms the starting point to the target is:
(1, 1) -> (1, 2)
(1, 2) -> (3, 2)
(3, 2) -> (3, 5)
```

### Example 2

```text
Input: sx = 1, sy = 1, tx = 2, ty = 2
Output: false
```

### Example 3

```text
Input: sx = 1, sy = 1, tx = 1, ty = 1
Output: true
```

### Constraints

- `1 <= sx, sy, tx, ty <= 10^9`

## Hints

### Hint 1

Work backwards from (tx, ty): the last operation must have produced the larger coordinate by adding the smaller one, so repeatedly subtract the smaller coordinate from the larger.

### Hint 2

Subtracting one at a time is too slow for 10^9; use the modulo operation (like the Euclidean algorithm) to subtract many copies at once.

### Hint 3

Once tx == sx, the remaining work can only change ty, so check (ty - sy) % sx == 0; symmetrically when ty == sy.
