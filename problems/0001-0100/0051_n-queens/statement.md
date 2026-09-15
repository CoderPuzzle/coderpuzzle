# N-Queens

## Description

The n-queens puzzle is the problem of placing `n` queens on an `n x n`
chessboard such that no two queens attack each other.

Given an integer `n`, return all distinct solutions to the n-queens puzzle.
Each solution contains a distinct board configuration of the n-queens'
placement, where `'Q'` and `'.'` indicate a queen and an empty space
respectively.

### Example 1

```text
Input: n = 4
Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
Explanation: There exist two distinct solutions to the 4-queens puzzle.
```

![The first 4-queens solution: queens at (row 1, column 2), (row 2, column 4), (row 3, column 1), and (row 4, column 3) of a 4x4 board.](figures/example-1.svg)

### Example 2

```text
Input: n = 1
Output: [["Q"]]
```

### Constraints

- `1 <= n <= 11`

The boards must be listed in the order produced by placing queens row by row
and trying columns from left to right.

## Hints

### Hint 1

Place one queen per row and backtrack over the column choices — no two queens can share a row by construction.

### Hint 2

Track occupied columns and both diagonal families (row - col and row + col) in sets for O(1) conflict checks.

### Hint 3

Try the columns of each row in increasing order so boards come out in a deterministic order.

### Hint 4

When a full placement is found, render the board as n strings of 'Q' and '.' and record it, then backtrack.
