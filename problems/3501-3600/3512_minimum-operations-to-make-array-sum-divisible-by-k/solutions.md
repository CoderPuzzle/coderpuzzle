# Solutions — Minimum Operations to Make Array Sum Divisible by K

## Modular arithmetic on the total

Each operation picks one element and lowers it by 1, so every operation
lowers the array's total sum by exactly 1 — the array never matters beyond
its total. Starting from `sum`, after `t` operations the total is
`sum - t`, and `t` operations are always feasible for any `t <= sum` by
spreading the decrements across elements (each element can go down to 0).
The reachable totals are therefore exactly `sum, sum - 1, …, 0`.

The cheapest reachable total divisible by `k` is the largest multiple of
`k` not exceeding `sum`, and the number of steps down to it is
`sum % k`. No smaller count can work: fewer operations leave a total of
`sum - t` with `t < sum % k`, whose residue modulo `k` is still nonzero.
When `sum` is already divisible by `k` the answer is `0`, matching
operations-free inputs.

The total is bounded by `1000 × 1000 = 10⁶`, so 32-bit arithmetic already
suffices; the scan is one pass over `nums`.

**Complexity:** `O(n)` time, `O(1)` space.
