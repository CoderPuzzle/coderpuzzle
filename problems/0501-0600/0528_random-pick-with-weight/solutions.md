# Solutions — Random Pick with Weight

## Prefix Sums plus Binary Search (Inverse CDF)

The required distribution — index `i` with probability `w[i] / sum(w)` — becomes trivial once it is drawn geometrically. Lay the weights end to end: prefix sums `P[i+1] = P[i] + w[i]` carve `[0, total)` into segments where segment `i` has length exactly `w[i]`. A single uniform integer over the interval therefore lands in segment `i` with probability `w[i] / total`, and locating the segment is a binary search over the sorted boundary array (`bisect_left` in Python, a hand-rolled loop in Java, both `O(log n)`).

The boundary convention must be fixed once and applied the same way on both sides: the canonical solutions draw `target ∈ [1, total]` and return the index of the first prefix boundary that is `>= target`. Slipping one comparison (`>` for `>=`, or `target` off by one) does not crash — it leaks a single unit of probability onto a neighboring index, which is invisible in small samples and glaring in the statistical judge's per-index frequencies (each judged `pickIndex` runs thousands to hundreds of thousands of draws, and every index's empirical frequency must match `w[i] / sum(w)` within a tolerance band).

Prefix sums are accumulated into `long` in the Java version: `10⁴` weights of `10⁵` sum to `10⁹`, which fits 32-bit ints only marginally and leaves no room for the `+1` bounds used during drawing.

**Judged scale.** A frequency bucket needs roughly `1400` expected draws before its tolerance band clears the noise floor with margin, so the statistically judged arrays hold at most ~100 indices with balanced weights (draw counts scale up to ~300000 accordingly, since each `pickIndex` costs one `O(log n)` search). A maximum-length `10⁴`-element array appears as a validity case — every draw must return a legal index — with its per-index frequencies merged into the distribution's tail.

**Complexity:** `O(n)` construction, `O(log n)` per `pickIndex`, `O(n)` space.

## Walker Alias Method

The line picture admits one more compression. Instead of leaving the
pieces in a row and searching for the one a point lands in, cut the
picture into `n` columns of equal height `total` and let index `i` keep
its own material in column `i`, filled to `w[i] * n`. Those fills
average exactly `total`, so the overfull columns can pour their surplus
into the underfull ones until every column is exactly full — a column
that receives records its donor as an `alias` and answers for its own
index over the lower part of its height, for the donor over the rest.

A draw then consults no search structure at all. One uniform integer
`cell` over the `n * total` grid decomposes into column `cell mod n` and
level `cell div n`, and the answer is the column while the level sits
under its own fill, otherwise the alias — a modulo, a division, and two
array reads, `O(1)` where the prefix solution pays `O(log n)`. Like the
references above, each `pickIndex` spends exactly one unit of
randomness; it is decomposed rather than searched.

For `w = [2, 3, 5]` the own-fills are `[6, 9, 15]` against the cap
`10`. Column `2` pours `4` units into column `0` and `1` more into
column `1`, leaving fills `[6, 9, 10]` with aliases `[2, 2, ·]`: levels
`0` through `5` of column `0` answer `0`, levels `6` through `9` answer
`2`; column `1` answers `1` through level `8` and `2` above it; column
`2` always answers `2`. Index `0` owns `6` of the `30` grid cells,
index `1` nine, index `2` fifteen — shares of `2/10`, `3/10`, and
`5/10`, matching the w.

The build runs two worklists, underfull and overfull, pairing one column
from each until neither has work left. Each pairing settles one
underfull column for good, and a column crosses from overfull to
underfull at most once, so the loop runs at most `2n` times. Every step
is integer arithmetic — fills, cap, and grid are whole numbers — so the
distribution is exact by construction, with none of the rounding care a
fractional table would need; the comparison `level < fill` carries the
same one-unit sensitivity the boundary convention above does, and the
frequency judge catches a `<=` the same way. The grid is the one wide
object: `n * total` reaches `10¹³` under the stated limits, so the `long`
the Java prefix port already reaches for is required here too. Judging
is draw-heavy — up to about `300000` draws per case against one build —
which is exactly the regime the constant-time lookup is for.

**Complexity:** `O(n)` construction, `O(1)` per `pickIndex`, `O(n)`
space.
