# Solutions — Dice Roll Simulation

## DP on (Last Face, Run Length)

The key insight is that a sequence's legality depends only on its last face and how many times that face has repeated at the end. The DP state `dp[j][c]` counts sequences of the current length that end with face `j` repeated exactly `c` times consecutively; since `rollMax[i] <= 15`, a 6-by-16 table holds the entire state.

Each step advances the table by one roll. Extending a run shifts the counts upward: a sequence ending in `j` repeated `c - 1` times becomes one ending in `j` repeated `c` times, for every `c` from 2 up to `rollMax[j]` — entries beyond the limit are never written, so overlong runs simply cannot exist. Starting a fresh run of face `j` requires any sequence that ends in a different face: the row sums give per-face totals, the grand total gives all sequences of the previous length, and `grand - totals[j]` counts exactly those not ending in `j`, which become the new `dp[j][1]`.

The base case seeds `dp[j][1] = 1` for each of the six single-roll sequences. Row sums are recomputed each round from the previous table before it is replaced, and modular reduction on the fresh-start entry keeps values bounded. After `n - 1` transitions, every legal sequence of length `n` is counted in exactly one cell (its final face and run length), so summing the whole table yields the answer.

**Complexity:** `O(n)` time, `O(1)` space.
