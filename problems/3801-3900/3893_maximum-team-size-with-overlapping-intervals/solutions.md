# Solutions — Maximum Team Size with Overlapping Intervals

A valid team is anchored by one member who interacts with everyone else, so the
largest team for a fixed anchor `i` is simply `i` together with every interval
that overlaps it. The answer is therefore the maximum, over all intervals, of
the number of intervals that share at least one time point with it — no other
structure is needed.

## Sorting and binary search

Two intervals `[a, b]` and `[c, d]` overlap exactly when `c <= b` and `a <= d`.
For a fixed interval `i = [s, e]`, the intervals overlapping it are those with
start time at most `e` and end time at least `s`. Counting the former is
`#(start <= e)` and counting the latter requires subtracting the intervals that
end before `s`: `#(start <= e) - #(end < s)`. The two sets are nested — an
interval ending before `s` necessarily starts before `s <= e` — so the
difference counts precisely the overlapping intervals, `i` itself included.

Both counts come from sorted copies of the two arrays. Sorting `startTime`
once lets a binary search report how many starts are at most `e` for every
interval in `O(log n)`, and sorting `endTime` once lets another binary search
report how many ends are strictly below `s`. One pass over the intervals then
computes each overlap count and keeps the maximum. The counts reach at most
`n = 10⁵`, well inside 32 bits.

**Complexity:** `O(n log n)` time, `O(n)` space.
