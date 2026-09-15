# Solutions — Maximum Candies Allocated to K Children

## Binary search on the answer

If every child can receive `c` candies, they can trivially receive any smaller amount, so feasibility is monotone in `c` and the answer is the largest feasible value — a perfect fit for binary search on the answer. For a candidate `c`, a pile of size `p` splits into exactly `floor(p / c)` child-sized portions, so `c` is feasible iff `Σ floor(p / c) >= k`; the check `can` runs one pass over `candies` and bails out early the moment the running count reaches `k`, which also makes `can(0)` vacuously true and pins the search's lower end at 0.

The search runs over `[0, max(candies)]` with the upper-mid form `mid = (lo + hi + 1) // 2`: when the predicate holds the bound moves _up_ to `mid`, and the `+1` prevents the classic infinite loop where `lo` and `hi` converge with `lo < mid` always false. Termination leaves `lo` as the maximum feasible value, which is `0` exactly when the total candy count cannot supply `k` children with even one candy each.

`k` reaches `10^12`, so counting must happen in full-width integers — a non-issue in Python, where the accumulation never overflows and no floating point is involved anywhere. Each feasibility pass is `O(n)` and the search performs `O(log max(candies))` of them, touching only a few scalars beyond the input.

**Complexity:** `O(n log(max(candies)))` time, `O(1)` space.
