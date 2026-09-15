# Solutions — Cutting Ribbons

Testing every candidate length linearly is too slow — lengths run to
`10^5` and each test scans all ribbons. The feasibility predicate is
monotone (if length `x` yields `k` pieces, so does any shorter length),
so binary search over the answer finds the boundary in log time.

## Binary search on segment length

For a candidate length `x`, a ribbon of length `r` contributes
exactly `floor(r / x)` segments, so `feasible(x)` is
`sum(floor(r_i / x)) >= k`. Binary search `x` over `[1, max(ribbons)]`,
keeping the largest feasible value; if even `x = 1` cannot reach `k`
pieces, return 0.

The sum fits comfortably in 64 bits: at most `10^5 * 10^5 = 10^10`
pieces of unit length.

**Complexity:** `O(n log(max(ribbons)))` time for `n` ribbons, `O(1)`
extra space.
