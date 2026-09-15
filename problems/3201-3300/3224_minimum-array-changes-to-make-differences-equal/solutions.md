# Solutions — Minimum Array Changes to Make Differences Equal

Only the `n / 2` symmetric pairs `(nums[i], nums[n - 1 - i])` matter, and the
final array is legal exactly when every pair shares one common difference `X`.
Since a change may write any value in `[0, k]`, there are at most `k + 1`
candidate values of `X`, and any solution commits to one of them — so the
answer is the cheapest per-pair repair total over all candidates.

## Difference sweep over every candidate X

Sort each pair as `lo <= hi`. Against a target difference `d` it costs `0`
when `hi - lo == d`. Otherwise one replacement fixes it precisely when some
placement stays inside `[0, k]`: keeping `lo` reaches up to `d <= k - lo`, and
keeping `hi` reaches down to `d <= hi`, so one change suffices iff
`d <= max(hi, k - lo)`. Failing both leaves no shared value to keep, and two
changes always suffice — write `0` and `d`, which fit because `d <= k`. So
each pair contributes cost 0 at one point, cost 1 across a prefix
`[0, max(hi, k - lo)]`, and cost 2 beyond.

Aggregate instead of rescanning pairs per candidate: bucket pairs by exact
difference, add each pair's reach as a `+1` range mark into a difference
array, and sweep `d` from `0` to `k`, tracking how many pairs are reachable
with one change. Then `cost(d) = n - reachable(d) - exact(d)` — every pair
starts priced at 2, each reachable pair saves 1, and an exact match saves the
remaining 1. Taking the minimum over the sweep is optimal because the sweep
evaluates every commitment the answer could possibly make. Each pair is
touched once and each candidate once, which is the least a correct algorithm
can read; totals never exceed `n`, so 32-bit integers suffice throughout.

**Complexity:** `O(n + k)` time, `O(k)` space.
