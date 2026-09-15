# Widest Vertical Area Between Two Points Containing No Points

## Description

You are given `n` points on a 2D plane, where `points[i] = [xi, yi]`. Return
the width of the widest vertical area between two points such that no point
lies inside the area.

A vertical area is a region of fixed width extending infinitely along the
y-axis (that is, it has infinite height). The widest vertical area is the
one with the maximum width.

Note that points lying on the edge of a vertical area are not considered to
be inside it.

### Example 1

![diagram](figures/1637-1.svg)

```text
Input: points = [[8,7],[9,9],[7,4],[9,7]]
Output: 1
Explanation: Sorting the x-coordinates gives 7, 8, 9, 9. The widest empty
band lies between x = 7 and x = 8 (or equivalently between x = 8 and x = 9),
each of width 1.
```

### Example 2

```text
Input: points = [[3,1],[9,0],[1,0],[1,4],[5,3],[8,8]]
Output: 3
Explanation: Sorting the x-coordinates gives 1, 1, 3, 5, 8, 9. The widest
empty band lies between x = 5 and x = 8, of width 3.
```

### Constraints

- `n == points.length`
- `2 <= n <= 10⁵`
- `points[i].length == 2`
- `0 <= xi, yi <= 10⁹`

## Hints

### Hint 1

Try sorting the points.

### Hint 2

Think about whether the y-coordinate of a point is relevant.
