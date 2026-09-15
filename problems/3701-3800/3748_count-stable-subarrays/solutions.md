# Solutions — Count Stable Subarrays

## Count Within Nondecreasing Runs

A subarray is stable exactly when it reads non-decreasing, so stability is a
property of runs: cut `nums` into its maximal non-decreasing segments and no
stable subarray ever crosses a boundary between two of them. For one end
index `e`, the starts that yield a stable subarray are exactly
`s ∈ [left[e], e]`, where `left[e]` is the smallest start whose window
through `e` still reads non-decreasing — inside a run that is the run's own
start, and after a drop it resets to just past that drop. A single pass
computes `left[]` by carrying the running start forward whenever
`nums[i] >= nums[i - 1]` and resetting it to `i` otherwise.

Counting per query then only needs two prefix sums over those endpoints:
`base[e] = e - left[e] + 1` counts every stable subarray ending at `e`
within its own run, and a prefix sum of `left[e]` itself will price the
clipping correction. For a query `[l, r]`, ends `e` with `left[e] >= l`
contribute their full run window `base[e]`, while earlier ends — sitting past
a drop somewhere inside `[l, r]` — overcount: `base[e]` reaches before `l`,
so their true contribution is clipped to `e - l + 1`. Because `left[]` never
decreases, the two populations split at one threshold `p`, found by binary
search: the clipped ones are exactly `e ∈ [l, p)`.

So each answer collapses to `sum(base[l..r]) + l * (p - l) - sum(left[l..p))`
read off the prefix arrays in constant time after the linear scan: the added
term hands every clipped end `e ∈ [l, p)` its `l - left[e]` overcount back,
which unfolds over that prefix as `l` repeated `p - l` times minus the
`left[e]` values themselves. Values reach roughly `n * (n + 1) / 2` — about
`5 * 10^9` at `n = 10^5` — so every sum is accumulated in 64-bit integers and
returned as such.

**Complexity:** `O(n + q log n)` time, `O(n)` space.
