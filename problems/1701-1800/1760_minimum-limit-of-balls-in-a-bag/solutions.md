# Solutions — Minimum Limit of Balls in a Bag

## Binary Search on the Answer

The question flips from "minimize the penalty" to "is a given penalty achievable": if every bag can be brought down to at most `p` balls within `maxOperations` divisions, then any penalty larger than `p` is achievable too, since the same division plan satisfies it. This monotone predicate makes the answer binary-searchable over the range `[1, max(nums)]`, and the search returns the smallest feasible value.

The feasibility check counts the minimum operations a penalty `p` requires. A bag holding `v` balls must end as at least `ceil(v / p)` pieces, and each division creates exactly one new bag, so it needs `ceil(v / p) - 1` operations — computed as the integer expression `(v - 1) // p`. These needs are simultaneously achievable because a bag can always be split into pieces whose sizes differ by at most one, so every piece is at most `ceil(v / p) <= p` balls. Summing over all bags and comparing against `maxOperations` decides feasibility.

The standard converging loop (`lo < hi`, keeping `hi` on success and `lo = mid + 1` on failure) lands on the minimal feasible penalty. The upper bound `max(nums)` is always feasible with zero operations, so the predicate is true somewhere in the range and the search never runs off the end; the lower bound 1 is reachable only when operations are plentiful.

**Complexity:** `O(n log(max(nums)))` time, `O(1)` space.
