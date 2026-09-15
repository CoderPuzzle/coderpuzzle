# Find Valid Matrix Given Row and Column Sums

## Description

You are given two arrays of non-negative integers, `rowSum` and `colSum`.
Somewhere out there is a 2D matrix of non-negative integers with
`rowSum.length` rows and `colSum.length` columns whose `i`-th row adds up
to `rowSum[i]` and whose `j`-th column adds up to `colSum[j]` — you are
never shown the matrix itself, only these two totals.

Construct **any** matrix of non-negative integers that produces the given
row and column sums. It is guaranteed that at least one such matrix
exists, and more than one usually does: any matrix satisfying the sums is
accepted, not just one particular arrangement.

Return the matrix as a 2D array.

### Example 1

```text
Input: rowSum = [3,8], colSum = [4,7]
Output: [[3,0],[1,7]]
Explanation: Row 0 sums to 3 + 0 = 3 and row 1 to 1 + 7 = 8, matching
rowSum. Column 0 sums to 3 + 1 = 4 and column 1 to 0 + 7 = 7, matching
colSum. [[0,3],[4,4]], [[1,2],[3,5]], and [[2,1],[2,6]] all satisfy the
same sums and are equally acceptable answers.
```

### Example 2

```text
Input: rowSum = [3,2,1], colSum = [1,2,3]
Output: [[1,2,0],[0,0,2],[0,0,1]]
Explanation: The rows sum to 3, 2, and 1; the columns sum to 1, 2, and 3.
Several other matrices, such as [[0,1,2],[1,1,0],[0,0,1]], satisfy the
same sums and are equally acceptable.
```

### Constraints

- `1 <= rowSum.length, colSum.length <= 500`
- `0 <= rowSum[i], colSum[i] <= 10⁸`
- `sum(rowSum) == sum(colSum)`

## Hints

### Hint 1

Find the smallest remaining value between the current row's remaining sum
and the current column's remaining sum, call it `x`. Place `x` in that
cell, then subtract it from both the row's and the column's remaining
sum. Repeat, moving through the grid, until every remaining sum is `0`.
