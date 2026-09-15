# Solutions — Minimum White Tiles After Covering With Carpets

## Suffix DP over tile positions

Each tile faces a binary choice once the state is fixed, which is what makes
a two-index dynamic programming exact: `dp[i][j]` is the fewest white tiles
still visible among `floor[i:]` when at most `j` carpets remain. Either tile
`i` is left showing and pays `floor[i]` on top of `dp[i+1][j]`, or a carpet
is laid with its left end exactly at `i` — hiding `i .. i+carpetLen-1` and
jumping the state to `dp[min(i+carpetLen, n)][j-1]`. Enumerating the carpet's
left end at the current tile loses no placement: any optimal cover can be
scanned left to right, and its leftmost carpet that touches the suffix
`floor[i:]` either starts at `i` or starts earlier and already hides tile
`i`, which the minimum absorbs through a cheaper state.

The table fills with `i` running downward and `j` upward, so every reference
is already computed; the `j = 0` column is just the suffix white counts.
Because the recurrence takes a minimum over placements rather than a sum,
overlapping or wasted carpets never hurt — extra carpets simply keep the
"at most" promise. With `floor.length` and `numCarpets` both at most 1000
the table holds about `10⁶` small integers and the sweep does one constant-
time step per cell; every count stays far below 1000, so plain machine ints
suffice in every language.

`dp[0][numCarpets]` then answers for the whole floor — for `"10110101"`
with `2` carpets of length `2`, the four `1`-runs cannot all be hidden and
the optimum leaves `2` white tiles.

**Complexity:** `O(n · numCarpets)` time, `O(n · numCarpets)` space.
