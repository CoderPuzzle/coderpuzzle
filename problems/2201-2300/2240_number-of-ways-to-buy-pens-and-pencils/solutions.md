# Solutions — Number of Ways to Buy Pens and Pencils

## Enumerate pens, derive pencils

Fixing the number of pens bought determines everything else: after
spending `pens * cost1`, the remaining money admits `remaining // cost2 + 1`
pencil counts (zero through the maximum). Summing that expression over
every affordable pen count — zero through `total // cost1` — counts each
(pens, pencils) pair exactly once.

**Complexity:** `O(total / cost1)` time, `O(1)` space.
