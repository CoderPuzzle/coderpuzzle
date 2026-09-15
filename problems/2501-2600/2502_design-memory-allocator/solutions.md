# Solutions — Design Memory Allocator

## Flat unit array with linear first-fit scan

With `n`, sizes, ids, and call counts all capped at `1000`, the direct
simulation the statement hints at is comfortably inside every budget: an
array of `n` cells, each holding the id that owns it (`0` meaning free).
The state is the whole story, so both operations are single sweeps.

`allocate` walks the array once looking for runs of consecutive zeros.
When a run reaching `size` is found at index `i`, those cells are stamped
with `mID` and `i` is returned; a run shorter than `size` is skipped past
its end rather than rescanned cell by cell. Because the scan moves left
to right and commits to the first adequate run it meets, the result is
exactly the statement's "leftmost block" rule — no best-fit tie-breaking,
ever. If the sweep ends without a fit, `-1` is returned. `freeMemory` is
a single pass that zeroes every cell equal to `mID` and counts them, so
blocks carrying the same id in scattered positions disappear together and
an unknown id frees exactly nothing.

Every call is `O(n)` worst case and at most 1000 calls occur, so a full
lifecycle costs at most ~10⁶ cell visits; counts stay far below 32-bit
range in every language.

**Complexity:** `O(n)` time per call, `O(n)` space for the unit array.
