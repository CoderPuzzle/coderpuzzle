# Solutions — Merge Operations for Minimum Travel Time

## Partition Dynamic Programming

A merge never changes which sign survives a run: removing a block of signs
folds their times, in order, into the first kept sign to the right, so a
final configuration is fully described by the set of surviving signs. If
kept sign `i` has `s` removals directly before it, its effective rate is
`time[i-s] + … + time[i]`, and each segment between consecutive kept signs
is charged that rate times its length. Exactly `k` merges means exactly `k`
removals among indices `1..n-2` — the first and last signs can never be
removed, since a merge deletes its left index and `i > 0`, `i + 1 < n`.

The DP follows hint 3: `dp[i][j][s]` is the minimum time for the prefix
ending at kept sign `i` with `j` merges spent and `s` consecutive removals
directly before `i` — the run length is the state, because it alone
determines sign `i`'s rate. Relaxing forward, each state extends to the
next kept sign `q`: the `q - i - 1` skipped signs become the new run `d`,
the segment `(position[q] - position[i]) · rate(i)` is charged, and `j`
grows by `d`. Prefix sums turn each rate lookup into `O(1)`, and the
answer is the minimum over the final states at sign `n - 1` with exactly
`k` merges. Total time is bounded by `l · sum(time) ≤ 10⁵ · 100 = 10⁷`,
which fits 32 bits, though the accumulators are widened anyway.

**Complexity:** `O(n² · k²)` time, `O(n · k²)` space.
