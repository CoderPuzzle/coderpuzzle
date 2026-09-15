# Solutions — Incremental Memory Leak

The consumed amount grows quadratically, so the crash time is tiny even
for full 31-bit sticks: `k` seconds consume `k(k+1)/2` bits in total,
and roughly 92–94k seconds already exceed any input the constraints
allow. Direct simulation is therefore effectively constant time, and it
sidesteps every tie-breaking and parity subtlety a closed formula would
have to encode.

## Simulate second by second

Keep both remainders and a second counter starting at 1. Each step,
pick the stick with more memory — the first on ties, per the statement —
and check whether it holds at least `t` bits: subtract and continue if
so, otherwise that second is the crash time and the current remainders
complete the answer. The loop runs under ~10⁵ iterations at worst.

**Complexity:** `O(√M)` time for memory magnitude `M` (at most about
93000 steps here), `O(1)` space.
