# Solutions — Count Elements With at Least K Greater Values

Both approaches turn the per-element question — "how many elements are
strictly greater than me?" — into an order statement: once the array is
viewed in ascending order, the elements strictly greater than any value form
a single suffix of that order, and whether a value qualifies depends only on
where its run of equal values ends. The sort reaches that order outright and
scans it; quickselect finds just the one decisive position without paying to
order everything else.

## Sort Suffix Scan

Sorting `nums` ascending lines every element up with its rank. An element at
sorted index `i` has exactly `n - i - 1` elements after it, so it qualifies
precisely when `n - i - 1 >= k` — that is, when `i <= n - k - 1`. Runs of
equal values complicate only this reading: elements inside one run see the
same strictly-greater count, the one their run's last element observes, and
the whole run qualifies or fails together by that shared test. So the scan
credits a run by its value's own test, not by position. Equivalently — and
this is the form the scan takes — every sorted position holding a value
strictly smaller than `sorted[n - k - 1]` qualifies, while positions holding
the threshold value itself join only when their run ends at or before index
`n - k - 1`; anything larger never qualifies.

The code therefore needs just two binary searches over the sorted array: one
to find where the threshold value's run begins (`left`) and one where it ends
(`right`). Positions below `left` all qualify; the run contributes only when
`n - right >= k`, in which case everything through `right` does. The sort
dominates at `O(n log n)`; what follows is logarithmic, with no extra space
beyond the sort itself.

**Complexity:** `O(n log n)` time, `O(1)` extra space beyond sorting (the
sort may use up to `O(log n)` stack).

## Quickselect Threshold

The full order is more than the answer needs. The count is decided entirely
by which values sit strictly below `sorted[n - k - 1]` — a single threshold
value — so all that is required is to _learn that value_, not to sort.
Quickselect finds it directly: it keeps a live window `[lo, hi]` promised to
contain target index `t = n - k - 1`, picks a pivot, partitions the window,
and keeps only the block still covering `t`. Each round retires the rest of
the window for good.

Pivots come from the window uniformly at random. Fixed pivot rules let
pre-sorted arrays discard one element per partition and degrade to
quadratic; random pivots deny any fixed input that leverage, cutting the
window by an expected constant fraction per round for linear expected work.
The split is three-way (Dutch flag): values strictly below the pivot move to
the front block, values strictly above to the back block, and the pivot's own
run of equals sits between them, leaving the window in one step — so an
all-equal array finishes in a single partition instead of grinding through
one element per round.

Once the partition places the target index `t` inside the pivot's equal run,
`nums[t]` holds the threshold value, and one final linear pass counts the
elements strictly below it (wholesale qualifiers) and those equal to it — the
latter join only when their strictly-greater count, `n - less - equal`,
reaches `k`. Total cost: expected-linear selection plus one linear count,
with the partition in place.

**Complexity:** `O(n)` expected time — worst case `O(n^2)` with probability
vanishing toward zero under random pivots. `O(1)` extra space.
