# Separate Squares II

## Description

You are given a 2D integer array `squares`. Each `squares[i] = [xi, yi, li]`
represents the coordinates of the bottom-left point and the side length of a
square parallel to the x-axis.

Find the minimum y-coordinate value of a horizontal line such that the total
area covered by squares above the line equals the total area covered by squares
below the line.

Answers within `10⁻⁵` of the actual answer will be accepted.

Note: Squares may overlap. Overlapping areas should be counted only once in
this version.

### Example 1

```text
Input: squares = [[0,0,1],[2,2,1]]
Output: 1.00000
Explanation: The two squares cover 1 square unit each. Any horizontal line between y = 1 and y = 2 leaves exactly 1 square unit above it and 1 square unit below it, so the minimum such y-value is 1.
```

![Two disjoint unit squares; the covered area is 2 and any line with 1 <= y <= 2 halves it.](figures/example-1.svg)

### Example 2

```text
Input: squares = [[0,0,2],[1,1,1]]
Output: 1.00000
Explanation: The smaller square lies entirely inside the larger one, so the covered region is just the 2 by 2 square of area 4. The line y = 1 splits it into two equal parts of area 2.
```

![The 1x1 square sits fully inside the 2x2 square, so the line y = 1 splits the covered area into 2 and 2.](figures/example-2.svg)

### Constraints

- `1 <= squares.length <= 5 * 10⁴`
- `squares[i] = [xi, yi, li]`
- `squares[i].length == 3`
- `0 <= xi, yi <= 10⁹`
- `1 <= li <= 10⁹`
- The total area of all the squares will not exceed `10¹⁵`.

## Hints

### Hint 1

The covered area below the line is a continuous, non-decreasing function of y, and between two consecutive y-coordinates where some square starts or ends, the horizontal width of the covered region is constant. Sweep those y-events in order.

### Hint 2

While sweeping, maintain the total length of the union of the currently active x-intervals. Coordinate compression over the x-coordinates plus a segment tree that stores a coverage count and covered length per node supports adding and removing a square in logarithmic time.

### Hint 3

Keep every running area as an exact integer. Inside the band where the accumulated area first reaches half of the total, a single linear equation gives the exact position of the line.
