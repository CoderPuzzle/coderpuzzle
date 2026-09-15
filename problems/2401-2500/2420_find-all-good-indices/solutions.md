# Solutions — Find All Good Indices

## Monotone-Run Prefix Counts

Checking one index by scanning both of its windows costs `O(k)`, so the
per-index brute force is `O(n·k)` — up to `10¹⁰` at the constraints, far
too slow. The two conditions are monotone-run questions, and run lengths
can be precomputed for every index at once. Let `noninc[i]` be the length
of the longest non-increasing run ending at `i`, and `nondec[i]` the
longest non-decreasing run starting at `i`. Both fall out of single
linear sweeps: extend the neighbor's run on a legal step (`nums[i] <=
nums[i-1]` leftward, `nums[i] <= nums[i+1]` rightward — ties allowed in
both directions), restart from 1 otherwise.

With those tables the test for index `i` becomes constant-time. The `k`
elements before `i` are exactly `nums[i-k .. i-1]`; that window is
non-increasing precisely when the run ending at `i-1` has length at least
`k`, i.e. `noninc[i-1] >= k`. Symmetrically the window after `i`,
`nums[i+1 .. i+k]`, is non-decreasing iff `nondec[i+1] >= k`. Note the
windows exclude `i` itself on both sides, so the boundary pair between
window and center never contaminates either check. Scanning the candidate
range `k <= i < n - k` in increasing order collects the answer already
sorted.

All values are counts bounded by `n <= 10⁵` and elements fit in 32 bits,
so every language runs this in plain machine integers with three linear
passes total.

**Complexity:** `O(n)` time, `O(n)` space.
