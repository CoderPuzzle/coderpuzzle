# Minimum Sensors to Cover Grid

## Description

You are given an `n x m` grid and an integer `k`.

A sensor placed on cell `(r, c)` covers every cell whose Chebyshev distance
from `(r, c)` is at most `k`, where the Chebyshev distance between cells
`(r1, c1)` and `(r2, c2)` is `max(|r1 - r2|, |c1 - c2|)`.

Return the minimum number of sensors required to cover every cell of the
grid.

### Example 1

```text
Input: n = 5, m = 5, k = 1
Output: 4
Explanation: Placing sensors at cells (0, 3), (1, 0), (3, 3) and (4, 1)
covers every cell of the grid.
```

### Example 2

```text
Input: n = 2, m = 2, k = 2
Output: 1
Explanation: A single sensor covers the entire 2 x 2 grid no matter where it
is placed.
```

### Constraints

- `1 <= n <= 1000`
- `1 <= m <= 1000`
- `0 <= k <= 1000`

## Hints

### Hint 1

Let `s = 2 * k + 1` be the side length of the square one sensor covers.

### Hint 2

The minimum number of sensors is `ceil(n / s) * ceil(m / s)`.
