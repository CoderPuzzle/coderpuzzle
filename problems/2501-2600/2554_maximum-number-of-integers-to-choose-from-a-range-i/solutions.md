# Solutions — Maximum Number of Integers to Choose From a Range I

## Greedy ascending walk with a range-filtered ban table

Whichever legal integers end up chosen, replacing any one of them with a
smaller still-legal unchosen integer keeps the same pick count and never
raises the sum — so some optimal selection is exactly "the smallest legal
integers, in order, until the budget runs out." That makes a single
ascending scan of `1..n` optimal: keep a membership table of bans clamped
to the range (any banned value above `n` can never be picked anyway), take
each unbanned value while `total + v <= maxSum`, and stop at the first
overflow because every later candidate costs strictly more.

The table form (direct-indexed flags rather than a hash probe per step)
turns the ban lookup into one array read and makes duplicate or
out-of-range ban entries harmless — they simply overwrite the same slot or
land outside it. Both loops together touch each banned entry once and each
candidate value once, with constant bookkeeping: a counter, the running
sum, and the table.

Every intermediate stays comfortably bounded. The running sum is capped by
construction at `maxSum <= 10⁹` and candidates at `n <= 10⁴`, so all
fixed-width languages keep 32-bit accumulators without overflow, while
JavaScript's worst-case magnitudes (`≤ 10⁹ + 10⁴`) sit far below its
exact-integer `Number` ceiling of `2⁵³`.

**Complexity:** `O(n + m)` time for `m = banned.length`, `O(n)` space.
