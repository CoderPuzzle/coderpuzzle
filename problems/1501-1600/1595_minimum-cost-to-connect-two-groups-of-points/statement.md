# Minimum Cost to Connect Two Groups of Points

## Description

Two groups of points sit side by side: the first group has `size1` points,
the second has `size2` points. You are given a `size1 x size2` integer
matrix `cost`, where `cost[i][j]` is the price of building a direct link
between point `i` of the first group and point `j` of the second group.

The two groups count as connected once every point in the first group has
at least one link to some point in the second group, and every point in
the second group has at least one link to some point in the first group.
A single point may carry any number of links — there is no cap on how many
times it gets reused.

Return the cheapest total price for which the two groups can be connected.

### Example 1

![diagram](figures/1595-1.svg)

```text
Input: cost = [[15,96],[36,2]]
Output: 17
Explanation: Link point 0 of the first group to point 0 of the second group
(price 15), and point 1 of the first group to point 1 of the second group
(price 2). Every point on both sides now has a link, for a total of 17.
```

### Example 2

![diagram](figures/1595-2.svg)

```text
Input: cost = [[1,3,5],[4,1,1],[1,5,3]]
Output: 4
Explanation: Link first-group point 0 to second-group point 0 (price 1),
first-group point 1 to second-group point 1 (price 1) and also to
second-group point 2 (price 1), and first-group point 2 to second-group
point 0 (price 1). Total price 4. Reusing first-group point 1 for two
links is free to do as often as needed — the only requirement is that
every point on both sides has at least one link.
```

### Example 3

```text
Input: cost = [[2,5,1],[3,4,7],[8,1,2],[6,2,4],[3,8,8]]
Output: 10
```

### Constraints

- `size1 == cost.length`
- `size2 == cost[i].length`
- `1 <= size1, size2 <= 12`
- `size1 >= size2`
- `0 <= cost[i][j] <= 100`

## Hints

### Hint 1

Every point in the first group either shares a link with a point that some
earlier first-group point already reached, or opens up a fresh subset of
still-unreached second-group points.

### Hint 2

Track state as (how many first-group points have been placed, which
second-group points have been reached so far) and search over that state
with dynamic programming and bitmasking.
