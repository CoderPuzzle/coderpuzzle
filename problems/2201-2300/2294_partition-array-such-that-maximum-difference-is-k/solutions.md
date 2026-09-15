# Solutions — Partition Array Such That Maximum Difference Is K

## Sort, then sweep with the group's minimum

A subsequence's maximum minus minimum depends only on which values it holds — order is irrelevant, and any set of positions forms a valid subsequence. So the task reduces to covering the multiset of values with the fewest groups whose spread stays within `k`, and sorting lines the values up for that.

Sweep the sorted array keeping `start`, the smallest value of the current group. Every value within `start + k` joins it; the first value past that bound opens a new group. This greedy is optimal: consecutive group starts differ by more than `k`, so any element of an earlier group and any element of a later one differ by more than `k` — no valid partition can ever co-locate elements from two different greedy groups, which forces at least the greedy's count, and the greedy attains it.

**Complexity:** `O(n log n)` time and `O(1)` extra space.
