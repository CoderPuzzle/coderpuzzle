# Solutions — Count Good Integers in a Range

## Digit DP

The range query is reduced to a prefix count: let `f(x)` be the number of good integers in `[0, x]`, then the answer is `f(r) - f(l - 1)`. Each `f(x)` is computed by a digit DP over the decimal digits of `x`, with state `(pos, tight, prev, started)`: the current position, whether the prefix built so far still matches `x` exactly (which caps the next digit at `digits[pos]` instead of 9), the previously placed digit, and whether any nonzero digit has been placed yet.

Leading zeros get special treatment because they are not really part of a number's representation: while no digit has started, placing a 0 keeps `started` false with `prev` reset, imposing no adjacency constraint. Once started, a digit `d` may be placed only if `abs(d - prev) <= k`. Reaching the end of the digit string returns 1 — every completed number counts, including single-digit numbers that have no adjacent pair to check, and 0 itself.

Memoization with an unbounded cache makes each state evaluate once. The `tight` states form a single chain along the digits of the bound, so almost all cached states are the freely reusable `tight = false` ones; with `r <= 10^15` there are at most `D <= 16` digit positions, ten possible previous digits, and the two boolean flags, so the state space is tiny and both bound evaluations are instantaneous. Since `l >= 10`, the good-or-not status of 0 — which the DP counts as good — cancels out in the subtraction.

**Complexity:** `O(D * 10^2)` time, `O(D * 10)` space.
