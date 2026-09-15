# Solutions — Subsequences with a Unique Middle Mode I

A size-5 subsequence is fixed by its middle index, so the count splits into
per-middle subproblems: for each index `m`, count the ways to pick two
elements before it and two after so that `nums[m]` is the unique mode.

## Count per middle, classify by side copies

Fix `m` and let `x = nums[m]`. A chosen left pair contains `a` copies of `x`
and a right pair `b` of them, so `x` occurs `1+a+b` times among the five
picked elements while the other four slots hold at most `4-a-b` copies of any
rival value. When `a+b >= 2` the frequency `1+a+b` is already untouchable —
`3 > 2`, `4 > 1`, `5 > 0` — so those six patterns contribute plain products
`C(l,a)·C(ml,2-a)·C(r,b)·C(mr,2-b)`, where `l`/`ml` count `x` and non-`x`
values strictly left of `m` and `r`/`mr` strictly right. When `a+b = 0` the
middle ties with every one of the four side picks, so nothing there is ever
counted.

That leaves the delicate pattern of exactly one side copy of `x`, where the
three non-`x` picks must be pairwise distinct. If the lone `x` sits left
(pattern `a=1, b=0`), a valid right pair avoids the left pick's value `u` and
is itself duplicate-free: with `cntR(y)` the right count of `y`, the number
of such pairs is `C(mr − cntR(u), 2) − Σ_{y≠u,x} C(cntR(y), 2)`, and summing
`L(u)` (left count of `u`) over all `u` times that bracket gives the pattern
total `T_R`; the mirrored `T_L` covers the `x` sitting right. Values are
compressed to ids so counts live in flat arrays, and as `m` sweeps left to
right each element moves from the right side to the left one, keeping the
pair sums `Σ C(cnt, 2)` incrementally maintained.

Per middle the side sums cost `O(d)` over `d` distinct values, so the whole
count is `O(n·d)` ≤ 10⁶ steps at `n ≤ 1000`. Terms such as
`l·ml·r·mr` reach about `4 × 10⁹` and per-middle totals stay under
`4 × 10¹²` — exact in 64-bit integers and in JavaScript's `Number` (below
`2⁵³`) — and each middle's total is reduced modulo `10⁹ + 7` as it is added.

**Complexity:** `O(n·d)` time, `O(d)` extra space, where `n` is the length of
`nums` and `d` its number of distinct values.
