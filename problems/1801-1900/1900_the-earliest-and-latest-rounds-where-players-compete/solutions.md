# Solutions — The Earliest and Latest Rounds Where Players Compete

Simulating every win/loss choice over explicit player sets is
exponential. The key reduction: only the two stars' positions matter.
Their pairings are forced (each always wins), the middle player always
advances, and every other pair freely contributes its front or back
member — so the next round is fully described by `(i, j, m)`, the
stars' ranks and the row size.

## Memoized DP over star positions

For a state `(i, j, m)` — 1-based ranks of `firstPlayer` and
`secondPlayer` in a row of `m` — if they are paired (`i + j = m + 1`)
the match happens this round. Otherwise enumerate every combination of
winners among pairs not involving either star, recompute both stars'
ranks in the sorted survivor list, and recurse; the state's answer is
one round past the best/worst of the successors. Mirror symmetry
(`i > m - j + 1`) folds equivalent states together and keeps the memo
small.

The recursion bottoms out when the stars share a pairing, and each
memoized state is a tuple of three small integers keyed exactly once.
Because the two stars always win, the survivor list always contains both,
so `survivors.index(i)` and `survivors.index(j)` never fail; the loop
over winner combinations is the only branching, and it is bounded by the
number of non-star pairs, which halves every round.

**Complexity:** `O(m²)` states with `O(2^(m/2))` transitions each at
row size `m` — tiny for `n <= 28` — with `O(m²)` memo space.
