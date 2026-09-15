# Solutions — Find Smallest Letter Greater Than Target

The sorted order is the whole problem: the smallest letter strictly greater
than `target` is exactly the first entry standing past everything at or below
`target`, so one bisection locates it. Strictness does double duty — a letter
equal to `target` is never the answer, and when every letter fails the test
the answer wraps around to `letters[0]`.

## Upper bound, wrapping to the front

Because `letters` is sorted, "at or below `target`" is true on a prefix of
the array and never true again after it, which is precisely the shape
bisection needs. The method tracks the half-open range `[lo, hi)`, starting
as the whole array, under a single invariant: everything left of `lo` is at
or below `target`, everything from `hi` onward is strictly greater. Each
iteration probes the midpoint with the single comparison
`letters[mid] <= target` — an at-or-below value proves the answer sits
strictly right of `mid`, anything else keeps `mid` a live candidate — and
discards half the range. When `lo` and `hi` meet they have squeezed out
everything except the boundary, the first strictly greater letter.

The comparison is deliberately `<=` rather than `<`: equality folds into the
discard side, so a run of copies of `target` — or of anything below it — is
skipped as one block, and the surviving index points at the next letter
after the run, which is what "strictly greater" demands in Example 2. If
that index is `len(letters)`, no letter qualified: every letter is at or
below `target`, which for a `target` at or past the maximum letter is
exactly Example 3's wrap case, and the answer is `letters[0]` — the smallest
letter of all, since the array is sorted.

The loop keeps no state beyond the two indices and halves the range on every
probe, so even a full 10⁴-letter array settles in at most fourteen
comparisons.

**Complexity:** `O(log n)` time, `O(1)` space.
