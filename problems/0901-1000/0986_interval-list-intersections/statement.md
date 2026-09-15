# Interval List Intersections

## Description

You are given two lists of closed intervals, `firstList` and `secondList`,
where `firstList[i] = [starti, endi]` and `secondList[j] = [startj, endj]`.
Each list of intervals is pairwise disjoint and in sorted order.

Return the intersection of these two interval lists.

A closed interval `[a, b]` (with `a <= b`) denotes the set of real numbers
`x` with `a <= x <= b`. The intersection of two closed intervals is a set of
real numbers that is either empty or represented as a closed interval. For
example, the intersection of `[1, 3]` and `[2, 4]` is `[2, 3]`.

### Example 1

```text
Input: firstList = [[0,2],[5,10],[13,23],[24,25]], secondList = [[1,5],[8,12],[15,24],[25,26]]
Output: [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]
```

![Interval lanes A and B above a number line, with the six intersection pieces marked in blue on an ans lane.](figures/example-1.svg)

### Example 2

```text
Input: firstList = [[1,3],[5,9]], secondList = []
Output: []
```

### Constraints

- `0 <= firstList.length, secondList.length <= 1000`
- `firstList.length + secondList.length >= 1`
- `0 <= starti < endi <= 10^9`
- `endi < start(i+1)`
- `0 <= startj < endj <= 10^9`
- `endj < start(j+1)`

## Hints

### Hint 1

Since both lists are sorted and disjoint, advance the interval that ends first — it can never intersect anything later in the other list.

### Hint 2

The intersection of intervals a and b is [max(starts), min(ends)] whenever that max does not exceed that min.

### Hint 3

Touching endpoints still count as an intersection: [1,5] and [5,8] share [5,5].
