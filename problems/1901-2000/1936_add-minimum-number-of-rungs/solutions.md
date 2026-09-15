# Solutions — Add Minimum Number of Rungs

The ladder is a chain of gaps, and each gap demands a fixed number of
inserted rungs determined only by its width and `dist`.

## Greedy gap bridging

The climb is a sequence of gaps: between the floor and the first rung, and
between each pair of consecutive rungs. A gap of `gap` between the current
height and the next existing rung can be crossed with `ceil(gap / dist) -
1` inserted rungs — place them as high as possible, at `current + dist`,
`current + 2 * dist`, and so on, leaving the last hop onto the existing
rung no longer than `dist`. Placing rungs higher never hurts, so this
per-gap minimum is also globally optimal and every gap is independent.

The scan keeps the current standing height, and for each rung computes how
many inserted rungs the gap demands with the integer expression
`(gap - 1) / dist`, then steps onto the rung. The whole ladder is crossed
in one left-to-right pass, with no backtracking and no per-rung simulation,
so even the largest ladders finish in linear time.

**Complexity:** `O(n)` time, `O(1)` space.
