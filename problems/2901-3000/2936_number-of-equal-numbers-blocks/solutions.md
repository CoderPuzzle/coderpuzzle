# Solutions — Number of Equal Numbers Blocks

The array's equal values form contiguous blocks, but the API offers no
way to jump — every fact about nums must be paid for with an `at` probe,
and the array can be far too long to probe position by position. The
solution below spends its probes so each block is found in logarithmic
work.

## Galloping binary search per block

Process the blocks left to right. Standing at index `i`, the current
block ends at the last index that still holds `nums[i]`, and because all
equal values are adjacent, the predicate "`at(m)` equals `at(i)`" is true
on a contiguous stretch starting at `i` and false ever after — a monotone
predicate, exactly what a binary search settles. Each block therefore
costs `O(log n)` probes: bracket the boundary, then bisect.

The constant factor improves with a gallop first: probe `i+1`, `i+2`,
`i+4, ...` until one of them misses the value (or the array ends). That
brackets the boundary between the last hit and the first miss, and the
binary search only has to bisect inside the bracket. A block spanning
`c` positions then costs about `2·log₂(c)` probes rather than
`2·log₂(n)`, so strings of tiny blocks — the worst case for a plain
per-block binary search — settle in one or two probes each, while the
final bisect stays logarithmic for long blocks. Every block ends with
`i` jumped to one past its last index, so the walk advances at least one
position per round and terminates.

On widths: indices and lengths reach 10¹⁵, so all position arithmetic is
64-bit; it peaks around 3 × 10¹⁵ mid-gallop, comfortably inside signed
64-bit range and far below JavaScript's 2⁵³ exactness limit. Values are
at most 10⁹ and fit 32 bits. The returned block count fits 32 bits too:
every block carries a distinct value, so the count `B` satisfies
`1 + 2 + … + B ≤ 10¹⁵` (the smallest possible element sum for `B`
distinct values), giving `B ≤ ~4.5 × 10⁷`.

**Complexity:** `O(B · log N)` calls to `at` for `B` blocks and `N =
size()`, `O(1)` space.
