# Solutions — Longest Balanced Substring II

## Count signatures across three cases

Every balanced substring uses one, two, or three distinct letters, and each
shape leaves a different footprint on the running counts, so the scan splits
into three independent passes and the answer is the largest length found.
With a single distinct letter, balance is vacuous: any stretch of one
repeated character qualifies, so this pass just reports the longest run of
equal neighbors.

With exactly two letters `x` and `y`, walk the string while ignoring the
third letter `z` and keep the running difference `d` between the counts of
`x` and `y`. Whenever two positions hold the same `d`, the stretch between
them added equal amounts of both letters — it contains no `z` and balances
the pair. A `z` breaks that story, because any window through it would gain
a third distinct character, so each `z` restarts the scan: the difference
returns to zero and old difference values must not match across the break.
Rather than clearing arrays at every `z`, each first-seen slot carries a
version stamp the split bumps, and remembering the earliest index of every
difference value within the current version makes every later repeat pay out
the maximal length ending there.

With all three letters, keep running counts and hash each prefix's signature
`(count_b - count_a, count_c - count_a)`, seeded with signature `(0, 0)` at
index −1. Two prefixes share a signature exactly when the stretch between
them changed `a`, `b`, and `c` by the same amounts — an all-three balanced
substring — and storing only the earliest index per signature again yields
the longest such stretch. The final answer is the maximum over the three
passes; nothing better can exist, since those are the only shapes a balanced
substring can take.

**Complexity:** `O(n)` time, `O(n)` space.
