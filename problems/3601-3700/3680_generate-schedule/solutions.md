# Solutions — Generate Schedule

## Circle-method rounds with a safe opener

The calendar itself rules out the small cases. With `n <= 3` each team must
play `2(n - 1)` of the `n(n - 1)` days, and `n(n - 1)` days cannot offer
that many non-adjacent slots. At `n = 4` every team plays exactly six of
the twelve days, so within each adjacent day-pair `(0,1), (2,3), ...` it
plays exactly once; since the two days of a pair must host disjoint
matches, each pair partitions all four teams into two fixed matches — which
forces every even day to repeat one identical match and every odd day its
partner, leaving the other four pairings unplayable. So `n <= 4` returns
empty, five teams takes its fixed pinned list, and every larger `n` builds.

For `n >= 6` the circle method does the work. Each half runs a single
round-robin: on a circle of `m = n - 1` teams (even `n`, team `n - 1`
pinned as the sentinel) or all `n` teams (odd `n`), round `r` pairs teams
at offsets `+k` and `-k` around position `r`. A round is therefore a
perfect matching when `n` is even and a near-perfect one when `n` is odd —
no two of its matches share a team — and every unordered pair appears in
exactly one round, so emitting both halves, the second with venues swapped,
plays every ordered pairing exactly once. The only danger is the seam
between consecutive rounds, and the opener scan dissolves it: a round opens
with its first listed match avoiding the two teams of the previously
emitted match, then reads out the rest in listing order. At most two
matches of a round can touch those two teams while the round lists at least
three, so a safe opener always exists — the same guarantee that makes
`n >= 6` exactly the feasible range.

**Complexity:** `O(n^2)` time, `O(n^2)` space.
