# Solutions — Minimize Max Distance to Gas Station

## Binary search on the answer

The penalty is monotone: if a maximum adjacent distance `D` is achievable with `k` stations, any larger `D` is too. So binary search the smallest feasible `D` over `[0, max gap]`. For a candidate `D`, a gap of length `g` must be cut into pieces of size at most `D`, which takes `ceil(g / D) - 1` new stations (pieces, not points), and `D` is feasible when the sum over all gaps is at most `k`. Note that `D = max gap` is always feasible, since every gap needs zero stations, so the upper end of the search interval is a valid answer.

The implementation halves `[lo, hi]` a fixed 60 times, each time running one linear feasibility pass over the gaps; 60 halvings shrink the interval by a factor of over `10^18`, far beyond the required `10^-6` tolerance, so returning `hi` — which the invariant keeps on the feasible side — is exact to the answer precision. A defensive guard handles a degenerate `mid <= 0` before dividing.

The answer is never `0` because the strictly increasing input leaves at least one positive gap that `k` new stations can shrink but never eliminate. Edge behavior: gaps much larger than the rest absorb most of the budget, and the feasibility check naturally spends station allowance greedily per gap since the cost formula is exact.

**Complexity:** `O(n log(maxGap / eps))` time (60 iterations of an `O(n)` check), `O(n)` space for the gap list.
