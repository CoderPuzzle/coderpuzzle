# Solutions

All approaches lean on the same fact: every element is positive, so each
window with sum `target` has a unique left end for its right end, and the
set of target-sum windows can be swept in one pass. The best-pair choice
then needs the shortest window entirely on one side of a split; the
presented solution keeps that running minimum in a prefix array and
combines as it goes. Enumerating all pairs of windows is quadratic and is
not competitive.

## Prefix Minima Plus Sliding Sweep

Slide a window over `arr` maintaining its sum. Whenever the sum hits
`target`, record the window's length at its right end. Keep `best[i]` =
shortest target-window ending at or before index `i`. While sweeping,
when a new window `[l..r]` completes, combine it with `best[l - 1]`: that
pair cannot overlap, covers every candidate pairing (the earlier member
of an optimal pair ends before the later one starts), and updates the
answer with `best[l - 1] + (r - l + 1)`. Then fold the new length into
`best`. One pass, constant extra work per index.

**Complexity:** `O(n)` time, `O(n)` space for the prefix minima.
