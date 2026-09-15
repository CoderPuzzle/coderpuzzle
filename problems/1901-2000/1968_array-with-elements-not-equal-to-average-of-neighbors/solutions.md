# Solutions — Array With Elements Not Equal to Average of Neighbors

An interior element equals the average of its neighbors only when one
neighbor is smaller and the other is larger — the element sits exactly at
the midpoint between them. So any arrangement that makes every interior
element a strict local minimum or a strict local maximum is automatically
valid. The pinned answer is one specific arrangement with that property,
built from a single sort.

## Sort and interleave halves

After sorting, split the array into the smaller half and the larger half.
Placing the larger half on the even indices and the smaller half on the
odd indices makes every even-indexed element strictly larger than both of
its (odd-indexed) neighbors, because every value in the larger half
exceeds every value in the smaller half. Symmetrically, every odd-indexed
element is strictly smaller than both of its neighbors. An element that is
strictly above or strictly below its neighbors can never be their average,
so every interior position satisfies the constraint and the two boundary
positions are unconstrained anyway.

The construction runs in the time of the sort plus one linear interleave.
It is deterministic, so it always reproduces the exact array the judge
expects.

**Complexity:** `O(n log n)` time, `O(n)` space.
