# Perfect Rectangle

## Description

Given an array `rectangles` where `rectangles[i] = [xi, yi, ai, bi]` represents
an axis-aligned rectangle. The bottom-left point of the rectangle is `(xi, yi)`
and the top-right point of it is `(ai, bi)`.

Return `true` if all the rectangles together form an exact cover of a
rectangular region.

### Example 1

![diagram](figures/391-1.svg)

```text
Input: rectangles = [[1,1,3,3],[3,1,4,2],[3,2,4,4],[1,3,2,4],[2,3,3,4]]
Output: true
Explanation: All 5 rectangles together form an exact cover of a rectangular
region.
```

### Example 2

![diagram](figures/391-2.svg)

```text
Input: rectangles = [[1,1,2,3],[1,3,2,4],[3,1,4,2],[3,2,4,4]]
Output: false
Explanation: Because there is a gap between the two rectangular regions.
```

### Example 3

![diagram](figures/391-3.svg)

```text
Input: rectangles = [[1,1,3,3],[3,1,4,2],[1,3,2,4],[2,2,4,4]]
Output: false
Explanation: Because two of the rectangles overlap with each other.
```

### Constraints

- `1 <= rectangles.length <= 2 * 10⁴`
- `rectangles[i].length == 4`
- `-10⁵ <= xi < ai <= 10⁵`
- `-10⁵ <= yi < bi <= 10⁵`
