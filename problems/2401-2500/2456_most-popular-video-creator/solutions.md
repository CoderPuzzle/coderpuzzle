# Solutions — Most Popular Video Creator

## Aggregate creators in one pass

A creator's total popularity and their most-viewed id can both be decided
in a single left-to-right pass (hint 2). For each creator a hash map
keeps three running values: the accumulated view total, the largest
single-video view count seen so far, and the id that achieves it. When a
new video ties the current best count, its id replaces the stored one
only when it is lexicographically smaller, which is exactly the statement's
tie rule.

Because every sum reaches at most `10⁵ * 10⁵ = 10¹⁰`, the totals are held
in 64-bit integers even though each individual `views[i]` fits in 32 bits.
After the pass, the maximum total is found, and every creator whose total
equals it contributes one `[creator, bestId]` row; the statement allows
the rows in any order, so a final sort gives a deterministic answer.

**Complexity:** `O(n)` time, `O(n)` space.
