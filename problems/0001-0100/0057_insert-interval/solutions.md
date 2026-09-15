# Solutions — Insert Interval

## Three-phase linear walk

Because `intervals` arrives sorted by start and non-overlapping, everything the new interval does not touch can be copied straight through, and everything it does touch forms one contiguous run in the middle. That splits the work into three phases: copy each interval that ends strictly before the new one starts, absorb the run that shares at least one point with it, then copy the rest.

The absorb phase never needs a merge list. It keeps the growing interval as a plain `[start, end]` pair and, for each interval whose start is at most the current end, widens the pair with `min` and `max` to cover it. Sharing a single point counts as overlapping, so the boundary tests are strict on one side and inclusive on the other: an interval passes phase one only when its end is below `start`, and joins the merge whenever its start is at most `end`. Once the run ends, the widened pair is appended and the remaining intervals — all starting beyond the new end — are copied unchanged.

The walk visits each interval once and does constant work per step, and the output is built directly in final order. An empty `intervals` list simply skips both copy phases, so the answer is the new interval alone.

**Complexity:** `O(n)` time, `O(n)` space.
