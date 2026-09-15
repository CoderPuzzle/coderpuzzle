# Solutions — Minimum Number of Arrows to Burst Balloons

## Greedy Arrows at Earliest Right Endpoint

Each balloon is an interval on the x-axis, and one arrow bursts exactly the balloons whose intervals contain its launch point. Minimizing arrows is thus the interval point-cover problem: choose as few points as possible so that every interval contains at least one chosen point.

The greedy sorts balloons by right endpoint and always shoots at the right endpoint of the first balloon not yet burst. That choice is optimal because any solution must cover this balloon with some point at or before its right end, and among points covering it, the right endpoint covers every interval that any earlier point could — moving a shot right can only pick up more balloons whose starts lie before it. So there is always an optimal solution whose first arrow lands exactly there.

The sweep over the sorted balloons tracks `last_arrow`, the position of the most recent shot. A balloon whose `start > last_arrow` was missed by every earlier arrow, so a new arrow is fired at this balloon's own `end` (the earliest-ending balloon remaining, preserving the greedy invariant). Note the strict inequality: balloons are closed intervals, so a balloon starting exactly at `last_arrow` is burst by that arrow and costs nothing extra, as in the example `[[1,2],[2,3],[3,4],[4,5]]`, which needs only two arrows.

![The four balloons of example 1 sorted by right endpoint, with vertical arrows at x = 6 and x = 12: the first arrow also bursts [2,8] and the second also bursts [10,16].](figures/solution-arrows.svg)

Coordinates span the full signed 32-bit range, which the code handles by never assuming nonnegative positions; sorting by end handles ties and disjoint balloons naturally (every balloon gets its own arrow).

**Complexity:** `O(n log n)` time (sort plus one linear pass), `O(n)` space for the sorted copy.
