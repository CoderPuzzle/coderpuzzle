# Solutions — Number of Distinct Roll Sequences

## DP over the Last Two Rolls

Two constraints shape a valid sequence: adjacent values must be coprime, and equal values must be more than two positions apart. The coprimality rule means a transition from roll `b` to roll `c` is legal only when `gcd(b, c) = 1`, and the gap rule forbids `c = b` (adjacent equal) and also `c = a` when the last two rolls were `(a, b)` — because repeating `a` at distance 2 violates `abs(i - j) > 2`. Nothing older than the previous two rolls matters, so a state of `(previous-previous, previous)` is exactly sufficient; the last three rolls add nothing.

Let `dp[a][b]` count valid sequences of the current length ending in `..., a, b`. The base for length 2 is `dp[a][b] = 1` for every ordered coprime pair with `a != b` (and `n = 1` short-circuits to 6). Extending by a roll `c` requires `c != a`, `c != b`, and `gcd(c, b) == 1`; each valid extension contributes `dp[a][b]` into `ndp[b][c]`. Rolling the table forward `n - 2` times and summing all entries gives the count modulo `10^9 + 7`. Zero-count states are skipped inside the loop, which prunes most of the 36-entry table since coprime pairs are sparse.

Note that coprimality alone already forbids `(b, b)` for `b > 1` (gcd is `b`), but the explicit `c != b` check also covers `(1, 1)`, and `c != a` handles the distance-2 repeat including the tricky `a = 1` case where gcd would not object. The double loop over 6 values keeps each transition step at 216 candidate triples.

**Complexity:** `O(n)` time (constant 6 x 6 x 6 work per step), `O(1)` space (two 7 x 7 tables).
