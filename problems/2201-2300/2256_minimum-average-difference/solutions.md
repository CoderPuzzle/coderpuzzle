# Solutions — Minimum Average Difference

## Prefix-sum scan over one pass

At index `i` the left part is `nums[0..i]` and the right part is
`nums[i+1..n-1]`. Both averages are integer divisions, and the right part is
empty exactly at the last index, where the statement fixes its average to `0`.
Maintain a running `prefix` as the loop advances; the right-part sum is then
`total - prefix`, so each average difference is computed in constant time from
two sums already known, and the scan records the index of the smallest
`abs(left_avg - right_avg)`.

The comparison is strict (`diff < best_diff`), which implements the tie-break
rule for free: a later index can match the running minimum but never displace
it, so the answer is the smallest index achieving the minimum. The suffix side
of the difference only ever needs the already-computed total; no suffix array
is required.

Sums reach at most `10⁵ · 10⁵ = 10¹⁰`, so the running total and the prefix must
be held in a 64-bit integer; the returned answer itself is the index, which fits
a 32-bit integer. With 64-bit accumulation the whole scan is a single linear
pass with no auxiliary structure.

**Complexity:** `O(n)` time, `O(1)` space.
