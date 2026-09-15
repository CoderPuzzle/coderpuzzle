# Solutions — Stone Game II

## Game DP over Suffix and M

Work backwards from the end of the row. Let `suf[i]` be the total stones in `piles[i:]`; since the two players split every remaining pile between them, the stones the current player eventually collects plus what the opponent collects from the rest always sum to `suf[i]`. That observation removes the need for two separate objectives: `dp[i][m]` — the best the player to move can collect from `piles[i:]` when the current value is `m` — determines the opponent's take too.

On the move, the player may take the first `x` piles for any `1 <= x <= 2m`, immediately handing over state `(i + x, max(m, x))`. Because the whole rest of the suffix is shared, taking `x` piles yields `suf[i] - dp[i + x][max(m, x)]` for the mover: whatever the opponent secures from the remainder is subtracted from the full suffix. The recurrence maximizes this over all legal `x`, and both players using it means both play optimally.

The table is filled backwards: outer loop `i` from `n - 1` down, inner loop `m` from 1 to `n`, with `dp[n][*] = 0` as the base (no piles left). The take loop is capped by `min(2 * m, n - i)` — taking more than the remaining piles is not a move — and the next `m` is clamped to `n` since a larger M never matters when no piles remain. `dp[0][1]` is Alice's haul from the initial state `M = 1`. With at most 100 piles, all values fit comfortably in 32-bit integers (at most 100 * 10^4).

Each of the `n^2` states scans up to `2m` take options, which the pile bound keeps small.

**Complexity:** `O(n^3)` time, `O(n^2)` space.
