# Describe the Painting

## Description

There is a long and thin painting that can be represented by a number
line. The painting was painted with multiple overlapping segments where each
segment was painted with a unique color. You are given a 2D integer array
`segments`, where `segments[i] = [start_i, end_i, color_i]` represents the
half-closed segment `[start_i, end_i)` painted with `color_i`.

The colors in the overlapping segments of the painting were mixed when it was
painted. When two or more colors mix, they form a new color that can be
represented as a set of mixed colors. For example, if colors `2`, `4`, and
`6` are mixed, then the resulting mixed color is `{2,4,6}`.

For the sake of simplicity, you should only output the sum of the elements
in the set rather than the full set.

You want to describe the painting with the minimum number of non-overlapping
half-closed segments of these mixed colors. These segments can be represented
by the 2D array `painting` where `painting[j] = [left_j, right_j, mix_j]`
describes a half-closed segment `[left_j, right_j)` with the mixed color sum
`mix_j`.

For example, the painting created with `segments = [[1,4,5],[1,7,7]]` can be
described by `painting = [[1,4,12],[4,7,7]]` because:

- `[1,4)` is colored `{5,7}` (with a sum of `12`) from both the first and second segments.
- `[4,7)` is colored `{7}` from only the second segment.

Return the 2D array `painting` describing the finished painting (excluding
any parts that are not painted). Although the segments may be returned in
any order, for this judge return them sorted in ascending order of their
left endpoints.

A half-closed segment `[a, b)` is the section of the number line between
points `a` and `b` including point `a` and not including point `b`.

### Example 1

```text
Input: segments = [[1,4,5],[4,7,7],[1,7,9]]
Output: [[1,4,14],[4,7,16]]
Explanation: The painting can be described as follows:
- [1,4) is colored {5,9} (with a sum of 14) from the first and third segments.
- [4,7) is colored {7,9} (with a sum of 16) from the second and third segments.
```

![Segments 1..4, 4..7, and 1..7 painted with colors 5, 7, and 9](figures/example-1.svg)

### Example 2

```text
Input: segments = [[1,7,9],[6,8,15],[8,10,7]]
Output: [[1,6,9],[6,7,24],[7,8,15],[8,10,7]]
Explanation: The painting can be described as follows:
- [1,6) is colored 9 from the first segment.
- [6,7) is colored {9,15} (with a sum of 24) from the first and second segments.
- [7,8) is colored 15 from the second segment.
- [8,10) is colored 7 from the third segment.
```

![Segments 1..7, 6..8, and 8..10 painted with colors 9, 15, and 7](figures/example-2.svg)

### Example 3

```text
Input: segments = [[1,4,5],[1,4,7],[4,7,1],[4,7,11]]
Output: [[1,4,12],[4,7,12]]
Explanation: The painting can be described as follows:
- [1,4) is colored {5,7} (with a sum of 12) from the first and second segments.
- [4,7) is colored {1,11} (with a sum of 12) from the third and fourth segments.
Note that returning a single segment [1,7) is incorrect because the mixed color sets are different.
```

![Two segments over 1..4 and two over 4..7](figures/example-3.svg)

### Constraints

- `1 <= segments.length <= 2 * 10^4`
- `segments[i].length == 3`
- `1 <= start_i < end_i <= 10^5`
- `1 <= color_i <= 10^9`
- Each `color_i` is distinct.

## Hints

### Hint 1

Treat each segment start as adding its color and each segment end as removing it, then sort the events by coordinate.

### Hint 2

Sweep the coordinate line while keeping a running sum of the colors that are currently active.

### Hint 3

Emit a new output piece at every coordinate where the active set changes, and skip the parts that are not painted.
