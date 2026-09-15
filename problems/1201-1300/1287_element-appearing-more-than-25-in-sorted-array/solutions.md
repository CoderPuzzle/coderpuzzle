# Solutions — Element Appearing More Than 25% In Sorted Array

## Quarter-mark probes with binary-search verification

A run covering more than a quarter of the array is physically too long to
squeeze between two consecutive quarter marks — it must contain at least
one of positions `n/4`, `n/2`, or `3n/4`. That pins the answer to at most
three candidates: read the values at those probes and verify each by
binary-searching its first and last occurrence (the array is sorted, so
lower/upper bounds land directly on the run). The one whose run length
exceeds `n/4` is the special integer; for tiny arrays where no probe
interior exists (`n <= 4`), the last element check closes it out since a
quarter of such arrays is at most one cell.

**Complexity:** `O(log n)` time for the three binary-search pairs,
`O(1)` space.
