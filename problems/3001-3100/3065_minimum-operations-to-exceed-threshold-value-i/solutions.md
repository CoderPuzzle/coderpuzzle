# Solutions — Minimum Operations to Exceed Threshold Value I

## Count elements below the threshold

Every operation removes the current smallest element, so the process strips
values strictly below `k`, one apiece, until the minimum reaches `k`. An
element already greater than or equal to `k` never gets removed, and each
element below `k` gets removed exactly once, so the order of removals cannot
change the total.

The answer is therefore just the count of elements strictly less than `k`:
one pass over `nums` suffices.

**Complexity:** `O(n)` time, `O(1)` space.
