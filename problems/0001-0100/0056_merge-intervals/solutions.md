# Solutions — Merge Intervals

## Sort and Sweep

Sorting the intervals by start (with end as a tiebreaker) transforms the merging problem into a linear sweep: once ordered, any interval that overlaps an earlier one must overlap or touch the most recent merged interval, because both of their starts are at least as large as everything before them. So a single pass keeping only the last merged interval suffices — nothing earlier can still be open.

The code builds `merged` incrementally over the sorted list. For each `(start, end)`, if `merged` is nonempty and `start <= merged[-1][1]`, the interval overlaps or touches the last merged one: its start is already covered, so only the right edge matters, and the last interval's end is raised to `end` when that is larger (an interval fully swallowed by the merge leaves it untouched). Otherwise the interval begins a new group and is appended as `[start, end]`.

![On a number line, [2,6] overlaps the open [1,3] and extends it to [1,6]; [8,10] and [15,18] stand alone.](figures/solution-merge-sweep.svg)

The comparison uses `<=`, not `<`, so touching intervals such as `[1,4]` and `[4,5]` count as overlapping and merge into `[1,5]`, as the problem requires. Because the input is sorted by start, each new interval's start is never below the last merged interval's start, so merging never needs to reopen or reorder earlier groups — the output is produced already sorted, with touching runs collapsed into maximal spans.

The `sorted(...)` call (which also copies, leaving the input untouched) dominates the sweep at `O(n log n)` comparisons; the sweep itself is linear. Storage is the sorted copy plus the output list, at most one entry per input interval before merging.

**Complexity:** `O(n log n)` time, `O(n)` space.
