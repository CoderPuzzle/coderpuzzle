# Create Grid With Exactly K Paths I

## Description

You are given three integers `m`, `n`, and `k`.

Construct any `m x n` grid consisting only of the characters `.` and `#`, where:

- `.` represents a free cell.
- `#` represents an obstacle cell.

A valid path is a sequence of free cells that:

- Starts at the top-left cell `(0, 0)`.
- Ends at the bottom-right cell `(m - 1, n - 1)`.
- Moves only:
    - Right, from `(i, j)` to `(i, j + 1)`, or
    - Down, from `(i, j)` to `(i + 1, j)`.

Return any grid such that there are exactly `k` valid paths from the top-left cell to the bottom-right cell. If no such grid exists, return an empty array.

### Example 1

```text
Input: m = 2, n = 3, k = 2
Output: ["...","#.."]
Explanation: There are exactly k = 2 valid paths from (0, 0) to (1, 2):
(0, 0) → (0, 1) → (0, 2) → (1, 2)
(0, 0) → (0, 1) → (1, 1) → (1, 2)
```

![diagram](figures/3988-1.svg)

### Example 2

```text
Input: m = 3, n = 3, k = 4
Output: ["..#","...","#.."]
Explanation: There are exactly k = 4 valid paths from (0, 0) to (2, 2):
(0, 0) → (0, 1) → (1, 1) → (1, 2) → (2, 2)
(0, 0) → (0, 1) → (1, 1) → (2, 1) → (2, 2)
(0, 0) → (1, 0) → (1, 1) → (1, 2) → (2, 2)
(0, 0) → (1, 0) → (1, 1) → (2, 1) → (2, 2)
```

![diagram](figures/3988-2.svg)

### Example 3

```text
Input: m = 1, n = 4, k = 2
Output: []
Explanation: No grid exists with exactly k = 2 valid paths for a 1 x 4 grid, so the answer is an empty array.
```

### Constraints

- `1 <= m, n <= 10`
- `1 <= k <= 4`

## Hints

### Hint 1

If `m == 1` or `n == 1`, the only possible positive number of valid paths is 1.

### Hint 2

For `m, n > 1`, construct a small grid pattern with exactly k paths for each k from 1 to 4.

### Hint 3

For `k = 2`, use a 2 x 2 open block. It has exactly two paths: right then down, or down then right.

### Hint 4

For `k = 3`, use a 2 x 3 open block, or a 3 x 2 open block. An empty 2 x 3 grid has exactly three paths.

### Hint 5

For `k = 4`, use either a fully open 2 x 4 block, a fully open 4 x 2 block, or a 3 x 3 block with the top-right and bottom-left cells blocked.

### Hint 6

After building the small block, connect its bottom-right cell to `(m - 1, n - 1)` using a single corridor, and fill all other cells with obstacles. If the required block cannot fit in either orientation, return an empty array.
