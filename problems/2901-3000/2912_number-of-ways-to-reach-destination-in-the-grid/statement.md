# Number of Ways to Reach Destination in the Grid

## Description

You are given two integers n and m which represent the size of a 1-indexed
grid. You are also given an integer k, a 1-indexed integer array source
and a 1-indexed integer array dest, where source and dest are in the form
[x, y] representing a cell on the given grid.

You can move through the grid in the following way:

- You can go from cell [x1, y1] to cell [x2, y2] if either x1 == x2 or
  y1 == y2.
- Note that you can't move to the cell you are already in e.g.
  x1 == x2 and y1 == y2.

Return the number of ways you can reach dest from source by moving through
the grid exactly k times.

Since the answer may be very large, return it modulo 10⁹ + 7.

### Example 1

```text
Input: n = 3, m = 2, k = 2, source = [1,1], dest = [2,2]
Output: 2
Explanation: There are 2 possible sequences of reaching [2,2] from [1,1]:
- [1,1] -> [1,2] -> [2,2]
- [1,1] -> [2,1] -> [2,2]
```

### Example 2

```text
Input: n = 3, m = 4, k = 3, source = [1,2], dest = [2,3]
Output: 9
Explanation: There are 9 possible sequences of reaching [2,3] from [1,2]:
- [1,2] -> [1,1] -> [1,3] -> [2,3]
- [1,2] -> [1,1] -> [2,1] -> [2,3]
- [1,2] -> [1,3] -> [3,3] -> [2,3]
- [1,2] -> [1,4] -> [1,3] -> [2,3]
- [1,2] -> [1,4] -> [2,4] -> [2,3]
- [1,2] -> [2,2] -> [2,1] -> [2,3]
- [1,2] -> [2,2] -> [2,4] -> [2,3]
- [1,2] -> [3,2] -> [2,2] -> [2,3]
- [1,2] -> [3,2] -> [3,3] -> [2,3]
```

### Constraints

- `2 <= n, m <= 10⁹`
- `1 <= k <= 10⁵`
- `source.length == dest.length == 2`
- `1 <= source[1], dest[1] <= n`
- `1 <= source[2], dest[2] <= m`

## Hints

### Hint 1

We are asked to count the number of sequences of length k + 1 that start
from (xs, ys) and end with (xd, yd). i.e., (xs, ys), (x1, y1), ...,
(xk - 1, yk - 1), (xd, yd).

### Hint 2

The key point is to see x and y separately.

### Hint 3

Suppose we do i vertical moves and k - i horizontal moves.

### Hint 4

In each vertical move, we change only y. Now let's count the number of
sequences of length i + 1 that start with source[2] and end with dest[2].
Let's call this number vertical_count.

### Hint 5

Do the same for horizontal moves and let it be horizontal_count.

### Hint 6

For each i, the number of ways would be vertical_count * horizontal_count

- C(n, i) since the order of vertical and horizontal moves could be
  arbitrary.
