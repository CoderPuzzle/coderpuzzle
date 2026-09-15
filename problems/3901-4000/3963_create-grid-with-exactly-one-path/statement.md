# Create Grid With Exactly One Path

## Description

You are given two integers `m` and `n`, representing the number of rows and columns of a grid.

Construct any `m x n` grid consisting only of the characters `.` and `#`, where:

- `.` represents a free cell.
- `#` represents an obstacle cell.

A valid path is a sequence of free cells that:

- Starts at the top-left cell `(0, 0)`.
- Ends at the bottom-right cell `(m - 1, n - 1)`.
- Moves only:
    - Right, from `(i, j)` to `(i, j + 1)`, or
    - Down, from `(i, j)` to `(i + 1, j)`.

Return any grid such that there is exactly one valid path from the top-left cell to the bottom-right cell.

### Example 1

```text
Input: m = 2, n = 3
Output: ["..#","#.."]
Explanation: The only valid path is: (0,0) → (0,1) → (1,1) → (1,2)
```

![diagram](figures/3963-1.svg)

### Example 2

```text
Input: m = 3, n = 3
Output: ["..#","#..","##."]
Explanation: The only valid path is: (0,0) → (0,1) → (1,1) → (1,2) → (2,2)
```

![diagram](figures/3963-2.svg)

### Example 3

```text
Input: m = 1, n = 4
Output: ["...."]
Explanation: The only valid path is: (0,0) → (0,1) → (0,2) → (0,3)
```

### Constraints

- `1 <= m, n <= 25`

## Hints

### Hint 1

It is enough to leave one simple route made of free cells and block every other cell.

### Hint 2

There are many routes to choose from. What is the simplest one you can think of?

### Hint 3

One possible route: Go right while possible, then go down till you reach the destination.
