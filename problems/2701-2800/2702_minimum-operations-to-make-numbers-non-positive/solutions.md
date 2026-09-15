# Solutions — Minimum Operations to Make Numbers Non-positive

## Binary search on the operation count with a counting feasibility check

Operation order is irrelevant, only counts matter: every operation
decrements every index by `y`, and additionally gives its chosen index
another `x - y`. So if index `i` ends up chosen `k_i` times across `t`
operations, it receives exactly `t*y + k_i*(x - y)` of decrement, no
matter when or in which order those operations happen. A candidate
answer `t` is therefore feasible precisely when there are non-negative
integers `k_0..k_{n-1}` with sum at most `t` such that each element's
requirement `a_i <= t*y + k_i*(x - y)` holds. Each requirement forces
its minimum pick count `max(0, ceil((a_i - t*y) / (x - y)))` — assign
every element its minimum and spend any leftover operations on one more
pick of anything — so feasibility reduces to checking whether the sum
of those minimums fits inside `t`, a single linear scan.

That predicate is monotone: more total operations only raise everyone's
baseline `t*y` and add spare pick budget, never break a feasible plan.
Binary search the smallest feasible `t` between 1 and
`ceil(max(nums)/y)` — at that upper end every element's baseline alone
covers it, which is realizable by repeatedly picking the maximum, since
the picked element gets even more (`x > y`). The answer is bounded by
that same upper end, so it stays below `10⁹ + y <= 2 * 10⁹`, well
inside int32/JS-exact range.

Bits: values reach `10⁹`, so naive 32-bit intermediates overflow.
Inside the check, `t*y` is bounded because `t <= ceil(max(nums)/y)`
implies `t*y <= max(nums) + y - 1 < 2^31`; but the running sum of
required picks can exceed 2^31 before the early exit fires (up to `t`
plus one term), so the accumulator uses 64-bit (Python integers grow
arbitrarily; JS doubles stay exact below 2^53). All arithmetic is
integer ceiling division — no floating point.

**Complexity:** `O(n log(max(nums)))` time, `O(1)` extra space.
