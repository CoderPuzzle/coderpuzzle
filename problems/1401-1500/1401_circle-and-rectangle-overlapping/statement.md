# Circle and Rectangle Overlapping

## Description

You are given a circle represented as (radius, xCenter, yCenter) and an
axis-aligned rectangle represented as (x1, y1, x2, y2), where (x1, y1)
are the coordinates of the bottom-left corner, and (x2, y2) are the
coordinates of the top-right corner of the rectangle.

Return true if the circle and rectangle are overlapped otherwise return
false. In other words, check if there is any point (xi, yi) that belongs
to the circle and the rectangle at the same time.

### Example 1

![diagram](figures/1401-1.svg)

```text
Input: radius = 1, xCenter = 0, yCenter = 0, x1 = 1, y1 = -1, x2 = 3, y2 = 1
Output: true
Explanation: Circle and rectangle share the point (1,0).
```

### Example 2

```text
Input: radius = 1, xCenter = 1, yCenter = 1, x1 = 1, y1 = -3, x2 = 2, y2 = -1
Output: false
```

### Example 3

![diagram](figures/1401-2.svg)

```text
Input: radius = 1, xCenter = 0, yCenter = 0, x1 = -1, y1 = 0, x2 = 0, y2 = 1
Output: true
```

### Constraints

- `1 <= radius <= 2000`
- `-10⁴ <= xCenter, yCenter <= 10⁴`
- `-10⁴ <= x1 < x2 <= 10⁴`
- `-10⁴ <= y1 < y2 <= 10⁴`

## Hints

### Hint 1

Locate the closest point of the square to the circle, you can then find
the distance from this point to the center of the circle and check if
this is less than or equal to the radius.
