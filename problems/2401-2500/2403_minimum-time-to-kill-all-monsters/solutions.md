# Solutions — Minimum Time to Kill All Monsters

## Bitmask dynamic programming

With at most 17 monsters, the reachable states are the `2^n` subsets of already-defeated monsters. Let `dp[mask]` be the minimum number of days needed to reach the state where exactly the monsters in `mask` are dead. What makes the state sufficient is that the daily gain depends only on how many monsters have been defeated (`popcount(mask) + 1`) and mana resets after every kill, so within a fixed defeated set the future cost of each remaining fight is fixed regardless of the order the set was killed in.

Transitions go forward over masks: from a reachable `mask`, defeating monster `j` not in the mask takes `ceil(power[j] / gain)` days, where gaining `gain` mana per day means that many days to accumulate at least `power[j]`. Relaxed into `dp[mask | (1 << j)]`, this fills every superset. Iterating masks in increasing numeric order is a valid evaluation order because setting an extra bit always produces a strictly larger mask, so each state is final before anything extends it; states still at the infinity sentinel (unreachable, though in fact all are reachable) are skipped.

The base case is `dp[0] = 0` — nothing defeated, no days spent — and the answer is `dp[(1 << n) - 1]`. The ceiling division `(power[j] + gain - 1) // gain` handles powers that are not multiples of the gain exactly, and powers up to `10^9` never overflow Python integers.

**Complexity:** `O(2^n * n)` time, `O(2^n)` space.
