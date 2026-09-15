# Solutions — Minimize Connected Groups by Inserting Interval

Every overlapping interval folds into a merged component, and a single new
interval of length at most `k` can only join components that are
consecutive after merging: it covers one contiguous stretch of the line, so
the components it straddles must form one run. The answer therefore reduces
to — sort, merge, then find the longest run of consecutive components whose
end-to-end span fits in `k`; each extra component inside that run removes
one group.

## Merge components, then slide over the span

Sort the intervals by start and merge overlapping (or touching) ones into
disjoint components `c_0 < c_1 < ... < c_{m-1}`. A new interval of length
at most `k` straddles components `c_l` through `c_r` exactly when
`c_r.start - c_l.end <= k`: placing it at `[c_l.end, c_r.start]` is
optimal, and note the span must reach across the interiors of every
component in between, not just the empty gaps between them. Both bounds of
that condition move monotonically as the window slides — starts increase
with `r`, ends increase with `l` — so two pointers find the widest valid
window in one pass: advance the right end component by component and
shrink from the left while `c_r.start - c_l.end` exceeds `k`. The answer
is `m` minus the best window's component count minus one (zero when the
intervals already form one component, leaving the count at `m`).

Every intermediate quantity is bounded by the coordinate range: the span
is at most `end_{m-1} - start_0 <= 10⁹`, comfortably inside 32-bit range
in every language, and the component count is at most `n`. Both passes are
single forward scans over flat arrays, so the merge pass and the window
sweep each touch every interval a constant number of times.

**Complexity:** `O(n log n)` time, `O(n)` space.
