# Solutions — Limit Occurrences in Sorted Array

## Sorted run truncation

Because the input is sorted, equal values form contiguous runs. Scan from
left to right and append the current value while fewer than `k` copies of it
have already been appended. When a run is longer than `k`, the extra copies
are skipped, which preserves relative order and the exact `k` copies required
for each distinct element.

No hash map is needed; a single counter for the current run suffices.

**Complexity:** `O(n)` time, `O(n)` space for the returned array.
