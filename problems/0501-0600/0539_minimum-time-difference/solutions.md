# Solutions — Minimum Time Difference

## Sort the minute marks

Each "HH:MM" string names one of only 24 × 60 minute marks, so the first move
is to convert every time point to that one integer, then sort. Sorting is what
confines the search: for any two marks with a third mark sitting between them,
that in-between mark is at least as close to one of the two as they are to
each other, so the closest pair overall must be adjacent in sorted order — one
linear scan over neighbor gaps finds it.

The clock wraps, though, and the sorted list is linear. The first and the last
mark are neighbors too, across midnight, so the scan also compares
`minutes[0] + 1440 - minutes[last]`, the gap from the last mark forward
through midnight to the first. Duplicate time points need no special case:
equal marks sort next to each other and their neighbor gap is 0.

One conversion pass, one sort, one scan — the sort dominates the work, and the
minutes array is the only allocation.

**Complexity:** `O(n log n)` time, `O(n)` space.
