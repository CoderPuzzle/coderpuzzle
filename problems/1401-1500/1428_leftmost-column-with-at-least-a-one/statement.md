# Leftmost Column with at Least a One

## Description

This is an **interactive** problem.

A row-sorted binary matrix is a matrix of `0`s and `1`s in which every row is
sorted in non-decreasing order — all the `0`s come first, then all the `1`s.
Given such a matrix, return the index (0-based) of the **leftmost column
that contains a 1**, or `-1` if there is none.

You cannot read the matrix directly — only through the `BinaryMatrix` object
the judge hands to your method:

- `get(row, col)` — returns the element at `(row, col)` (0-indexed).
- `dimensions()` — returns `[rows, cols]`, the size of the matrix.

Making more than **1000 calls to `get`** is judged wrong (the oracle's
budget; `dimensions()` is free).

**Note (CoderPuzzle):** this problem is offered in Python 3 and Java only.

### Example 1

```text
Input: mat = [[0,0],[1,1]]
Output: 0
Explanation: Row 0 holds no 1, row 1 starts with a 1 at column 0 — the
leftmost column containing a 1 anywhere in the matrix is column 0.
```

### Example 2

```text
Input: mat = [[0,0],[0,1]]
Output: 1
Explanation: The only 1 in the matrix sits at column 1.
```

### Example 3

```text
Input: mat = [[0,0],[0,0]]
Output: -1
Explanation: The matrix contains no 1 at all.
```

### Constraints

- `1 <= rows, cols <= 100`
- `mat[i][j]` is either `0` or `1`.
- Every row is sorted in non-decreasing order.
- At most 1000 calls to `get`.

## Hints

### Hint 1

Because each row is sorted, the first `1` of a row can be found by binary
search: about `log cols` calls per row, `rows · log cols` overall — already
within the budget for a 100 x 100 matrix.

### Hint 2

There is a sharper walk: start at the **top-right** corner. On a `1`, record
the column and step left (this row cannot improve the answer further left);
on a `0`, step down (nothing in this row right of here matters).

### Hint 3

The pointer only ever moves left or down, so the walk finishes in at most
`rows + cols - 1` calls — at most 199 for the largest matrix, and any column
it last saw a 1 in is the leftmost such column.
