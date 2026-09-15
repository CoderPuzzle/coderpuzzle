# Solutions — Minimum Moves to Equal Array Elements II

## Median convergence

A move touches exactly one element and shifts it by exactly one unit, so no
move ever helps two elements at once: converging the array on any common
value `t` costs precisely `sum |x - t|` moves, whatever order the moves are
made in. The problem therefore reduces to the choice of `t` — find the value
that minimizes a sum of absolute distances.

The exchange argument pins that value down. Stand at a candidate `t` with `k`
elements below it and `m` above: sliding `t` down by one unit changes the
total by `k - m`, and sliding it up by `m - k`. The total keeps shrinking
toward the middle as long as one side outweighs the other, and it can improve
no further exactly when neither does — at the median. Sorting makes this
concrete: pairing the sorted values outermost-inward, each pair contributes
its full gap wherever inside the pair the shared value lands, so for even `n`
every pivot between the two middle values ties, and the lower middle element
is as good a pivot as any.

One numerical caution: with `n` up to `10⁵` and each distance up to `2·10⁹`
(values span `±10⁹`), the running total reaches `2·10¹⁴`, far beyond 32-bit
range. Fixed-width languages accumulate it in 64 bits; only the final sum,
promised to fit in 32 bits, is cast back down.

**Complexity:** `O(n log n)` time, `O(1)` extra.
