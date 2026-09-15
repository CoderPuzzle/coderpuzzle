# Find the Number of Copy Arrays

## Description

You are given an array `original` of length `n` and a 2D array `bounds` of
length `n x 2`, where `bounds[i] = [ui, vi]`.

You need to find the number of possible arrays `copy` of length `n` such
that:

- `(copy[i] - copy[i - 1]) == (original[i] - original[i - 1])` for
  `1 <= i <= n - 1`.
- `ui <= copy[i] <= vi` for `0 <= i <= n - 1`.

Return the number of such arrays.

### Example 1

```text
Input: original = [1,2,3,4], bounds = [[1,2],[2,3],[3,4],[4,5]]
Output: 2
Explanation: The possible arrays are:
[1, 2, 3, 4]
[2, 3, 4, 5]
```

### Example 2

```text
Input: original = [1,2,3,4], bounds = [[1,10],[2,9],[3,8],[4,7]]
Output: 4
Explanation: The possible arrays are:
[1, 2, 3, 4]
[2, 3, 4, 5]
[3, 4, 5, 6]
[4, 5, 6, 7]
```

### Example 3

```text
Input: original = [1,2,1,2], bounds = [[1,1],[2,3],[3,3],[2,3]]
Output: 0
Explanation: No array is possible.
```

### Constraints

- `2 <= n == original.length <= 10⁵`
- `1 <= original[i] <= 10⁹`
- `bounds.length == n`
- `bounds[i].length == 2`
- `1 <= bounds[i][0] <= bounds[i][1] <= 10⁹`

## Hints

### Hint 1

copy[0] uniquely determines all other values.

### Hint 2

Possible values for copy[0] are in [u[0], v[0]].

### Hint 3

From left to right, compute valid ranges for each index by intersecting
bounds with the previous range.

### Hint 4

The answer is the size of the valid range for the last index.
