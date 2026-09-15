# Find Smallest Common Element in All Rows

## Description

Given an m x n matrix mat where every row is sorted in strictly increasing
order, return the smallest common element in all rows.

If there is no common element, return -1.

### Example 1

```text
Input: mat = [[1,2,3,4,5],[2,4,5,8,10],[3,5,7,9,11],[1,3,5,7,9]]
Output: 5
```

### Example 2

```text
Input: mat = [[1,2,3],[2,3,4],[2,3,5]]
Output: 2
```

### Constraints

- `m == mat.length`
- `n == mat[i].length`
- `1 <= m, n <= 500`
- `1 <= mat[i][j] <= 10⁴`
- `mat[i]` is sorted in strictly increasing order.

## Hints

### Hint 1

Notice that each row has no duplicates.

### Hint 2

Is counting the frequency of elements enough to find the answer?

### Hint 3

Use a data structure to count the frequency of elements.

### Hint 4

Find an element whose frequency equals the number of rows.
