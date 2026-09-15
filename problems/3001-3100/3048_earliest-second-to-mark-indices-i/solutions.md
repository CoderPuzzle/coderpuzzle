# Solutions — Earliest Second to Mark Indices I

## Binary search on latest-occurrence deadlines

If every index can be marked within `t` seconds, the same schedule still works
for any longer horizon, so feasibility is monotone in `t` and binary search
applies. Optimal play never decrements an index that is already zero or already
marked: on an unmarked zero it makes the index unmarkable forever, and on a
marked one it is strictly worse than doing nothing. Under that normalization
every value stays non-negative and never rises, so a value that reaches zero
stays zero — which means any winning schedule can be rewritten to mark each
index at its **last** occurrence within `[1, t]`: moving a mark later keeps it
legal, and two indices never share a last occurrence because each second names
exactly one index.

With mark times pinned to last occurrences the check becomes pure counting.
Walk seconds `1..t` keeping `need`, the total decrements demanded by indices
whose deadline has already passed, and `marked`, how many marks were placed.
When second `s` is the last occurrence of index `i` (an index that never occurs
makes `t` infeasible), index `i` must be marked there, and its `nums[i]`
decrements must all land in earlier seconds not spent on marks; the prefix
offers exactly `s - marked` such slots once this mark is counted, so feasibility
requires `need + nums[i] <= s - marked` at every deadline. These prefix
inequalities are Hall's condition for assigning unit decrement jobs to free
slots before their deadlines: they are plainly necessary, and whenever they all
hold, filling the earliest free slot greedily constructs a valid schedule, so
they are sufficient too. The answer is the smallest `t` that passes, or `-1`.

**Complexity:** `O((n + m) log m)` time, `O(n)` space.
