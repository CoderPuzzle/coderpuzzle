# Solutions — Minimum K to Reduce Array Within Limit

## Binary search on the reduction k

An element `v` needs exactly `ceil(v / k)` reduce-by-`k` operations to go
non-positive, and the elements are independent, so `nonPositive(nums, k)` is
the sum of those ceilings. Call `k` feasible when that sum is at most `k²`;
feasibility is monotone because raising `k` never increases any ceiling while
`k²` strictly grows, so the feasible values form a suffix of the positive
integers and the answer is its left edge — found by binary search.

The search range starts at `lo = 1` and `hi = max(nums)`, doubling `hi` while
it is infeasible. The warm-up is provably short: once `k >= max(nums)` every
ceiling is exactly 1, so the sum equals `n` there, and the loop therefore
stops at the first power-of-two multiple of `max(nums)` whose square covers
`n` — no doubling at all when `max(nums)²` already reaches `n`, at most a
handful otherwise.

Each feasibility check is one flat pass, so fixed-width languages accumulate
the sum in 64-bit integers: with `n` and every value at most `10⁵` the sum
reaches `10¹⁰` and so does `k²`, both beyond `2³¹`. JavaScript and TypeScript
rely on doubles, which hold every integer involved exactly — all quantities
sit orders of magnitude below `2⁵³`. The loops are iterative throughout; no
input size drives recursion depth.

**Complexity:** `O(n log m)` time, `O(1)` space, where `m = max(nums)`.
