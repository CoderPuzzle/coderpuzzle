# Solutions — Non-overlapping Intervals

## Greedy by Earliest End

Minimizing removals is the same as maximizing the number of kept, pairwise non-overlapping intervals — the classic activity-selection problem. The optimal greedy is to sort by right endpoint and always keep the interval that ends earliest: keeping it leaves the maximum room for everything that comes after, since any other choice ends at the same point or later and can only shrink the set of compatible future intervals.

The code walks the intervals sorted by `end`, tracking `prev_end`, the end of the last interval kept. An interval is kept when its start is at or after `prev_end` (touching endpoints do not overlap, so `start == prev_end` is allowed and `prev_end` advances to this interval's own end); otherwise it is discarded and counted as removed. Every discarded interval necessarily intersects the last kept one, so at most one removal is ever "charged" per conflict, matching the exchange argument for optimality.

![The intervals of example 1 sorted by right endpoint on a timeline: [1,2], [2,3], and [3,4] are kept (accent) while [1,3] is removed because its start 1 precedes the last kept end 3.](figures/solution-interval-sweep.svg)

Ties in end points are harmless: duplicates like three copies of `[1,2]` keep the first and remove the rest, exactly the required count. A single interval or an already non-overlapping set removes nothing. The sentinel `prev_end is None` distinguishes "nothing kept yet" from a genuine `end` of 0, which matters because endpoints can be negative or zero.

**Complexity:** `O(n log n)` time (the sort dominates; the sweep is linear), `O(n)` space for the sorted copy.
