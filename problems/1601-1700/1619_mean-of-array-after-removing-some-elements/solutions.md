# Solutions — Mean of Array After Removing Some Elements

## Sort and trim

Sorting the array turns the value-based description ("smallest 5%",
"largest 5%") into a simple positional slice: once `arr` is sorted, the
elements to discard are exactly its first `trim` and last `trim` entries,
where `trim` is `5%` of the length. Because the length is guaranteed to be
a multiple of `20`, `trim` is always a whole number, so no rounding is
needed to find the cut points.

After sorting, summing the middle slice from index `trim` (inclusive) to
`length - trim` (exclusive) and dividing by its size gives the mean of the
kept elements directly. Ties among equal values never matter here: which
copy of a repeated value lands just inside or just outside the trimmed
range is irrelevant, since every copy contributes the same value to the
sum regardless of its position.

**Complexity:** `O(n log n)` time, `O(1)` extra space.
