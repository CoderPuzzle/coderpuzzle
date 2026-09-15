# Solutions — Count The Number of Winning Sequences

## Bottom-up DP over (last move, point difference)

The only state that matters after `i` rounds is Bob's last creature and
the running difference `d` = Bob's points minus Alice's: `d` moves by
exactly `+1`, `0`, or `-1` each round, fixed by Bob's move against
Alice's fixed creature. So `dp[t][d]` counts Bob's prefixes ending with
move `t` at difference `d`, and each round row `t` is fed by the two
other rows — both moved by the _same_ `delta(t, alice)` — reduced modulo
10⁹ + 7. The answer sums `dp[t][d]` over all `t` and all `d > 0`.

Grouping the two feeding rows before the shift keeps each transition to a
single elementwise add plus one shifted copy, so a round costs
`O(n)` work per target move and the whole table fills in `O(n²)` for
`n <= 1000`. The pass is iterative bottom-up, so the `2n + 3` wide
columns (difference shifted by `n + 1`) roll forward in constant many
rows of memory. Entries stay below `10⁹ + 7`, and the final triple-row
sum stays below `6·10³ · (10⁹ + 7) < 2⁶³` (and `< 2⁵³` for JS/TS
`Number`), so 64-bit accumulators make the final reduction exact.

**Complexity:** `O(n²)` time, `O(n)` space.
