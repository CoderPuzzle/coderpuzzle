# Solutions — Merge Two 2D Arrays by Summing Values

Both inputs arrive already sorted by id, which reduces the whole problem to
a linear merge rather than anything requiring a re-sort afterwards: at every
step exactly one of three cases applies (the heads tie, the left head is
smaller, or the right head is smaller), and appending that winner keeps the
output globally ordered with no stability or tie-break subtleties — ids are
strictly increasing inside each input, so the two heads are never ambiguous.

## Two-pointer merge

Walk one pointer per array. When the two head ids match, emit the pair
`[id, v1 + v2]` and advance both pointers; otherwise emit whichever head
holds the smaller id and advance only that side. When either array runs dry,
exactly one of the tails is non-empty and its rows — still sorted, still
free of duplicates — are appended verbatim. Sums peak at `1000 + 1000 =
2000` and ids at 1000, so every intermediate stays far inside 32-bit range
in all seven languages; no widening is needed anywhere.

The hash-map alternative gathers values into a dictionary keyed by id and
then sorts the keys to restore order. It produces identical output but pays
an extra `O(k log k)` pass over up to 400 distinct ids that the merge never
needs, so the scan form is kept as the reference.

**Complexity:** `O(n₁ + n₂)` time, `O(n₁ + n₂)` space for the output.
