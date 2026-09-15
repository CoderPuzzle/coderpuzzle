# Painting a Grid With Three Different Colors

## Description

You are given two integers `m` and `n`. Consider an `m x n` grid where each
cell is initially white. You can paint each cell red, green, or blue. All
cells must be painted.

Return the number of ways to color the grid with no two adjacent cells
having the same color. Since the answer can be very large, return it modulo
`10^9 + 7`.

### Example 1

```text
Input: m = 1, n = 1
Output: 3
Explanation: The three possible colorings are red, green, and blue.
```

![A single cell painted red, green, or blue](figures/example-1.svg)

### Example 2

```text
Input: m = 1, n = 2
Output: 6
Explanation: The six possible colorings are shown below.

r g    g r    b r
r b    g b    b g
```

![The six colorings of a 1 x 2 grid](figures/example-2.svg)

### Example 3

```text
Input: m = 5, n = 5
Output: 580986
```

### Constraints

- `1 <= m <= 5`
- `1 <= n <= 1000`

## Hints

### Hint 1

Represent each valid coloring of a single column (adjacent rows differ) as a state; for m <= 5 there are at most 3 * 2^4 such states.

### Hint 2

Two adjacent columns are compatible when they differ in every row; DP across the n columns over compatible state pairs.
