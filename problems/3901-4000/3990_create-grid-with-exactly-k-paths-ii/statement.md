# Create Grid With Exactly K Paths II

## Description

You are given an integer `k`.

Construct any grid consisting only of the characters `.` and `#`, where:

- `.` represents a free cell.
- `#` represents an obstacle cell.

The grid must contain at most 25 rows and at most 25 columns.

A valid path is a sequence of free cells that:

- Starts at the top-left cell `(0, 0)`.
- Ends at the bottom-right cell `(m - 1, n - 1)`, where `m` and `n` are the dimensions of your constructed grid.
- Moves only:
    - Right, from `(i, j)` to `(i, j + 1)`, or
    - Down, from `(i, j)` to `(i + 1, j)`.

Return any grid such that there are exactly `k` valid paths from the top-left cell to the bottom-right cell. If no such grid exists, return an empty array.

### Example 1

```text
Input: k = 2
Output: ["..#","#..","#.."]
Explanation: The grid contains exactly 2 valid paths from (0, 0) to (2, 2):
(0, 0) → (0, 1) → (1, 1) → (1, 2) → (2, 2)
(0, 0) → (0, 1) → (1, 1) → (2, 1) → (2, 2)
```

![diagram](figures/3990-1.svg)

### Example 2

```text
Input: k = 3
Output: ["...","#..","#.."]
Explanation: The grid contains exactly 3 valid paths from (0, 0) to (2, 2):
(0, 0) → (0, 1) → (0, 2) → (1, 2) → (2, 2)
(0, 0) → (0, 1) → (1, 1) → (1, 2) → (2, 2)
(0, 0) → (0, 1) → (1, 1) → (2, 1) → (2, 2)
```

![diagram](figures/3990-2.svg)

### Constraints

- `1 <= k <= 1000`

## Hints

### Hint 1

A fully open 2 x 2 block has exactly two ways to move from its top-left cell to its bottom-right cell.

### Hint 2

If several such blocks are connected in sequence, each block doubles the number of ways to reach the next block.

### Hint 3

Use these blocks to create cells that are reachable in 1, 2, 4, 8, ... ways.

### Hint 4

Decompose k into powers of two. For every power of two used in this decomposition, connect the corresponding cell to a common final corridor.

### Hint 5

Make the final corridor have exactly one path to the bottom-right cell, so the total number of valid paths is the sum of the selected powers of two.

### Hint 6

Since k <= 1000, at most 10 powers of two are needed. The construction therefore uses at most 20 rows and 13 columns, which fits inside the 25 x 25 limit.

### Hint 7

The diagram below illustrates this construction:
