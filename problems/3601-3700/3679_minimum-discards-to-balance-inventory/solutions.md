# Solutions — Minimum Discards to Balance Inventory

## One-pass window counts

The day-by-day rules already fix everything: an arrival is keepable exactly
when its type occurs fewer than `m` times among kept arrivals inside the last
`w` days, and discarding an item never helps any later decision more than
keeping it did. Keeping greedily whenever the rule allows is therefore
optimal, and the whole task reduces to answering, for each day, how many kept
arrivals of the arriving type sit in the trailing `w`-day window.

A hash map from type to kept-occurrences answers that in constant time if it
stays in sync with the sliding window. On each day the arriving item's count
is read: equal to `m` means the arrival is discarded and nothing changes;
otherwise it is kept and incremented. The subtle half of the bookkeeping is
the left edge. When day `i - w` slides out of the window, its contribution
must be decremented only if that arrival was actually kept — a discarded
arrival was never counted in the first place, so blindly decrementing on every
exit would silently steal capacity from a still-present kept twin of the same
type. A parallel boolean array records each day's keep/discard decision and
gates the decrement.

Each day then costs a constant number of map operations, so the sweep runs in
linear time over the `10⁵`-scale input with space for at most one entry per
distinct type plus the decision array. No window is ever materialized, no
counts are ever recomputed per day — the difference between this and an
O(n·w) rescan is what makes the largest cases comfortable.

**Complexity:** `O(n)` time, `O(n)` space.
