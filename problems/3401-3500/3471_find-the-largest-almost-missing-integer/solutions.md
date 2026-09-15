# Solutions — Find the Largest Almost Missing Integer

## Window sweep with per-value counters

"Appears in exactly one subarray of size k" is a counting question over the
`n - k + 1` windows, so the direct move is to sweep each window once and
tally, per value, how many distinct windows contain it. The subtlety is
deduplication: a value repeated inside a single window must still count once
there, so the sweep stamps each value with the window it was last credited
to and only bumps the counter when the stamp differs. Since values are
bounded by the constraints to `0..50`, both the counter and the stamp fit in
fixed 51-slot arrays — no hash structure is needed.

With the counts in place the answer is a downward scan from 50: the first
value whose window count is exactly 1 is the largest almost missing integer,
and falling through to -1 means no qualifier exists. The whole pass is
`O(n · k)` — at most `50 · 50` stamp checks at the constraint ceiling — with
`O(1)` working space beyond the two arrays.

**Complexity:** `O(n · k)` time, `O(1)` space.
