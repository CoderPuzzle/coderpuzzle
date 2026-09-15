# Solutions — Russian Doll Envelopes

## Width sort plus binary-searched LIS on heights

A chain of nested envelopes is a 2D strictly increasing sequence, and the trick is to collapse it to one dimension: sort envelopes by width ascending and, for equal widths, by height descending. In that order, any chain of envelopes must have strictly increasing widths, so at most one envelope of each width can appear in a chain; sorting same-width envelopes by descending height ensures such envelopes can never be mistaken for a chain among themselves, and the remaining task is exactly the longest strictly increasing subsequence of heights.

That LIS is computed with patience sorting over a `tails` array: for each height, binary search (`bisect_left`) finds the first tail `>= h`; if none exists the height extends the longest chain and is appended, otherwise it replaces that tail. `tails` stays sorted and its length is the LIS length — replacement is safe because a smaller tail preserves the invariant that `tails[i]` is the minimum possible height ending a chain of length `i + 1`, giving future heights a better chance to extend. `bisect_left` (rather than `bisect_right`) enforces the _strict_ increase the problem requires, rejecting equal heights.

Edge cases: duplicate envelopes (same width and height) are handled by the descending-height tie-break plus strict search — the second copy only ever replaces the tail the first copy created, never lengthening the chain. A single envelope yields length 1, and the quadratic DP LIS (too slow at 10^5 elements) is avoided entirely.

**Complexity:** `O(n log n)` time, `O(n)` space.
