# Solutions — Minimum Total Distance Traveled

## Assignment DP over Sorted Robots and Factories

Because robots move along a line and crossing assignments never help, an optimal repair plan has a non-crossing structure: after sorting robots and factories by position, each factory serves a contiguous block of robots (possibly empty), and the blocks appear in the same left-to-right order as the factories. Swapping any two crossing robot-factory assignments to uncross them never increases total distance by the triangle inequality, which is what licenses the contiguous-block model.

That structure yields a classic partition DP. Let `dp[i]` be the minimum total distance for repairing the first `i` robots using the factories processed so far; it starts at 0 only for `i = 0` and infinite otherwise. Introducing a factory at `pos` with capacity `limit` means choosing how many of the currently unassigned trailing robots it absorbs: for each `t` from 1 to `min(limit, i)`, the factory takes robots `i-t .. i-1` at a cost equal to their summed distances to `pos`, added to `dp[i-t]`. Keeping `dp[i]` as a "skip this factory" option makes zero-assignment factories legal. Processing all factories leaves `dp[n]` as the answer.

The summed distances for every `t` are precomputed per factory as a prefix array `pref[i]` of `|robot[j] - pos|` over sorted robots, so the innermost loop is pure arithmetic — `pref[i] - pref[i-t]` is the block's cost. Sorted order is what makes this correct as well as fast: a factory's assigned robots being the ones adjacent to it in position is exactly the non-crossing structure, and consecutive prefix differences always describe a contiguous, positionally sensible block.

With `n` robots and `m` factories bounded by 100, the triple loop is at most `m · n · L` steps, where `L` is the largest factory limit, and the rolling one-dimensional table keeps memory linear. Positions up to `10^9` in magnitude make distances large, but Python integers absorb them exactly.

**Complexity:** `O(m·n·L)` time, `O(n)` space.
