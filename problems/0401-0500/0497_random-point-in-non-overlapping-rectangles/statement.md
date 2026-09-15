# Random Point in Non-overlapping Rectangles

## Description

You are given an array of non-overlapping axis-aligned rectangles `rects`
where `rects[i] = [ai, bi, xi, yi]` indicates that `(ai, bi)` is the
bottom-left corner point of the `i`-th rectangle and `(xi, yi)` is the
top-right corner point of the `i`-th rectangle. Design an algorithm to pick
a random integer point inside the space covered by one of the given
rectangles. A point on the perimeter of a rectangle is included in the space
covered by the rectangle.

Any integer point inside the space covered by one of the given rectangles
should be equally likely to be returned.

Note that an integer point is a point that has integer coordinates.

Implement the `Solution` class:

- `Solution(int[][] rects)` Initializes the object with the given rectangles
  `rects`.
- `int[] pick()` Returns a random integer point `[u, v]` inside the space
  covered by one of the given rectangles.

### Statistical judging

`pick` samples **uniformly over covered integer points**, exactly as on
LeetCode — the judge verifies this statistically rather than comparing a
single draw. Each judged `pick` is invoked tens of thousands of times, every
returned point must lie inside one of the rectangles, and the empirical
frequency of each point must fall within a tolerance band of its probability
`1 / total`, where `total` is the number of covered integer points (a
rectangle covering more cells is correspondingly more likely to be hit).

Enumerating every covered point is only feasible for small rectangles, so
the statistically judged cases keep the covered area at most ~100 integer
points (up to ~150000 draws per judged `pick`). The uniformity argument —
choose a rectangle proportionally to its area, then a cell uniformly inside
it — is scale-independent; the constraints below allow coordinates far
beyond what any enumerable table could cover.

### Example 1

```text
Input:
["Solution", "pick", "pick", "pick", "pick", "pick"]
[[[[-2, -2, 1, 1], [2, 2, 4, 6]]], [], [], [], [], []]
Output: [null, [1, -2], [1, -1], [-1, -2], [-2, -2], [0, 0]]
Explanation:
Solution solution = new Solution([[-2, -2, 1, 1], [2, 2, 4, 6]]);
solution.pick(); // return [1, -2]
solution.pick(); // return [1, -1]
solution.pick(); // return [-1, -2]
solution.pick(); // return [-2, -2]
solution.pick(); // return [0, 0]
```

### Example 2

```text
Input:
["Solution", "pick", "pick"]
[[[[0, 0, 1, 1], [10, 10, 11, 11]]], [], []]
Output: [null, [0, 1], [11, 10]]
Explanation:
Solution solution = new Solution([[0, 0, 1, 1], [10, 10, 11, 11]]);
solution.pick(); // return [0, 1] — the two squares cover 4 points each, so
                 // every covered point has probability 1/8
solution.pick(); // return [11, 10]
```

### Constraints

- `1 <= rects.length <= 100`
- `rects[i].length == 4`
- `-10⁹ <= ai < xi <= 10⁹`
- `-10⁹ <= bi < yi <= 10⁹`
- `xi - ai <= 2000` and `yi - bi <= 2000`
- All the rectangles do not overlap.
- At most `10⁴` calls will be made to `pick`.

## Hints

### Hint 1

Uniform over points decomposes into two easier uniforms: if you first choose
rectangle `i` with probability `area(i) / total` (its count of integer
cells) and then a point uniformly inside it, every covered point ends up
with probability exactly `1 / total`. Weighted choice among few items is
what prefix sums plus one random integer are for.

### Hint 2

Treat each rectangle's cells as a contiguous run in one long numbering:
prefix sums `P[i+1] = P[i] + (xi - ai + 1) * (yi - bi + 1)`. A draw
`cell ∈ [0, total)` lands in run `i` where `P[i] <= cell < P[i+1]` — found
by binary search, since `P` is sorted.

### Hint 3

Decode the cell index inside its rectangle with the width: with
`w = xi - ai + 1` and `offset = cell - P[i]`, the point is
`(ai + offset % w, bi + offset / w)` — exactly like row-major indexing of a
`w`-wide grid, and reversible, so the mapping is a bijection and the inner
uniform really is uniform over cells.
