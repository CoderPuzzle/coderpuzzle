# Rectangle Area II

## Description

You are given a 2D array of axis-aligned rectangles. Each `rectangles[i] = [xi1, yi1, xi2, yi2]` denotes the `i`th rectangle where `(xi1, yi1)` are the coordinates of the bottom-left corner, and `(xi2, yi2)` are the coordinates of the top-right corner.

Calculate the total area covered by all rectangles in the plane. Any area covered by two or more rectangles should only be counted once.

Return the total area. Since the answer may be too large, return it modulo `10⁹ + 7`.

### Example 1

```text
Input: rectangles = [[0,0,2,2],[1,0,2,3],[1,0,3,1]]
Output: 6
Explanation: A total area of 6 is covered by all three rectangles, as illustrated in the picture.
From (1,1) to (2,2), the green and red rectangles overlap.
From (1,0) to (2,3), all three rectangles overlap.
```

![The three overlapping rectangles on a coordinate grid: a green 2 x 2, a red 1 x 3, and a blue 2 x 1, with overlaps shown darker.](figures/example-1.svg)

### Example 2

```text
Input: rectangles = [[0,0,1000000000,1000000000]]
Output: 49
Explanation: The answer is 10¹⁸ modulo (10⁹ + 7), which is 49.
```

### Constraints

- `1 <= rectangles.length <= 200`
- `rectangles[i].length == 4`
- `0 <= xi1, yi1, xi2, yi2 <= 10⁹`
- `xi1 <= xi2`
- `yi1 <= yi2`
- All rectangles have non zero area.

## Hints

### Hint 1

Compress the unique x and y coordinates so the plane becomes a coarse grid of at most 400 by 400 cells.

### Hint 2

Mark every compressed cell that is covered by at least one rectangle, then sum the real areas of the marked cells.

### Hint 3

Because coordinates reach 10⁹ while there are at most 200 rectangles, coordinate compression keeps the work independent of the coordinate magnitude.
