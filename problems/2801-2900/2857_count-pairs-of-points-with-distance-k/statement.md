# Count Pairs of Points With Distance k

## Description

You are given a 2D integer array `coordinates` and an integer `k`, where
`coordinates[i] = [xi, yi]` are the coordinates of the `ith` point in a 2D
plane.

We define the distance between two points `(x1, y1)` and `(x2, y2)` as
`(x1 XOR x2) + (y1 XOR y2)` where `XOR` is the bitwise XOR operation.

Return the number of pairs `(i, j)` such that `i < j` and the distance between
points `i` and `j` is equal to `k`.

### Example 1

```text
Input: coordinates = [[1,2],[4,2],[1,3],[5,2]], k = 5
Output: 2
Explanation: We can choose the following pairs:
- (0,1): Because we have (1 XOR 4) + (2 XOR 2) = 5.
- (2,3): Because we have (1 XOR 5) + (3 XOR 2) = 5.
```

### Example 2

```text
Input: coordinates = [[1,3],[1,3],[1,3],[1,3],[1,3]], k = 0
Output: 10
Explanation: Any two chosen pairs will have a distance of 0. There are 10 ways to choose two pairs.
```

### Constraints

- `2 <= coordinates.length <= 5 * 10⁴`
- `0 <= xi, yi <= 10⁶`
- `0 <= k <= 100`

## Hints

### Hint 1

Suppose that `x = x1 XOR x2` and `y = y1 XOR y2` then we can get
`x2 = x XOR x1` and `y2 = y XOR y1`.

### Hint 2

We are supposed to have `k = x + y` so we can get `x2 = x XOR x1` and
`y2 = (k - x) XOR y1`.

### Hint 3

We can iterate over all possible values of `x` and count the number of points
`(x1, x2)` and `(x2, y2)`.
