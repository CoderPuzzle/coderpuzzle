# Solutions — Minimum Cost to Split an Array

A split is just a set of cut points, so the cost decomposes along the
last cut: knowing the cheapest way to handle every prefix turns the
exponential space of splits into one shortest-path pass over the
cut positions.

## Split-point DP with a running frequency table

Let `dp[r]` be the minimum cost to split the first `r` elements. The
last piece of that split is some subarray `nums[l..r]`, which scores
`k + trimmed(nums[l..r]).length`, giving `dp[r] = min(dp[l] +
importance(l..r))` over `0 <= l < r`. Computing each importance from
scratch would make the whole thing `O(n^3)`; instead, fix `r` and sweep
`l` downward, growing the window one element at a time against a single
frequency table. The delta formula is exactly three cases: if the new
element never appeared it adds nothing (it will eventually be trimmed);
its _second_ appearance adds two, because both that occurrence and the
earlier stray one become duplicates simultaneously; every further copy
adds one. That keeps each `r`'s sweep linear and the total `O(n²)` —
for `n = 1000`, roughly a million transitions, comfortably within the
limits.

Nothing tricky hides in the bookkeeping: only `dp[l]` values that are
already final participate (`l < r`), tables reset per `r`, and the
whole-array single-split candidate falls out naturally at `l = 0`. The
answer's ceiling is `n·(k + n) ≤ 10¹² + 10⁶`, which is why every fixed
width language carries the DP in 64-bit integers (`long long`/`long`/
`int64`/`i64`) — past `int` range by three orders of magnitude — while
JavaScript/TypeScript numbers stay exact because `10¹²` sits far below
`2⁵³`.

**Complexity:** `O(n²)` time, `O(n)` space.
