# Maximum Area of a Piece of Cake After Horizontal and Vertical Cuts

## Description

You are given a rectangular cake of size `h x w` and two arrays of
integers `horizontalCuts` and `verticalCuts` where:

- `horizontalCuts[i]` is the distance from the top of the rectangular
  cake to the ith horizontal cut and similarly, and
- `verticalCuts[j]` is the distance from the left of the rectangular cake
  to the jth vertical cut.

Return the maximum area of a piece of cake after you cut at each
horizontal and vertical position provided in the arrays
`horizontalCuts` and `verticalCuts`. Since the answer can be a large
number, return this modulo `10⁹ + 7`.

### Example 1

![diagram](figures/1465-1.svg)

```text
Input: h = 5, w = 4, horizontalCuts = [1,2,4], verticalCuts = [1,3]
Output: 4
Explanation: The figure above represents the given rectangular cake. Red
lines are the horizontal and vertical cuts. After you cut the cake, the
green piece of cake has the maximum area.
```

### Example 2

![diagram](figures/1465-2.svg)

```text
Input: h = 5, w = 4, horizontalCuts = [3,1], verticalCuts = [1]
Output: 6
Explanation: The figure above represents the given rectangular cake. Red
lines are the horizontal and vertical cuts. After you cut the cake, the
green and yellow pieces of cake have the maximum area.
```

### Example 3

```text
Input: h = 5, w = 4, horizontalCuts = [3], verticalCuts = [3]
Output: 9
```

### Constraints

- `2 <= h, w <= 10⁹`
- `1 <= horizontalCuts.length <= min(h - 1, 10⁵)`
- `1 <= verticalCuts.length <= min(w - 1, 10⁵)`
- `1 <= horizontalCuts[i] < h`
- `1 <= verticalCuts[j] < w`
- All the elements in `horizontalCuts` are distinct.
- All the elements in `verticalCuts` are distinct.

## Hints

### Hint 1

Sort the arrays, then compute the maximum difference between two
consecutive elements for horizontal cuts and vertical cuts.

### Hint 2

The answer is the product of these maximum values in horizontal cuts and
vertical cuts.
