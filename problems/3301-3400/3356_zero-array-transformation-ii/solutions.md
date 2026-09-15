# Solutions — Zero Array Transformation II

Each query only ever helps: a query's decrements are "at most val", so an
extra query can always be applied as all-zero decrements. That makes the
predicate "the first k queries suffice" monotone in k, and the answer is
the smallest feasible k.

## Binary search on k with a difference-array probe

A fixed k suffices exactly when every index can be driven to zero. Index i
sees the first k queries that cover it, and each covering query j
contributes at most valj — chosen independently per index, so the index
reaches zero if and only if the sum of valj over those covering queries is
at least nums[i]. One probe therefore just measures, per index, the total
allowance of the first k queries: fold the k prefixes into a difference
array (val at l, minus val at r + 1), sweep one running sum across the
indices, and fail at the first index whose allowance falls short. Each
probe is O(n + q), and O(log q) probes locate the boundary k — or report
-1 when even k = q leaves a deficit. Coverage sums are bounded by
q · val ≤ 5 · 10⁵, comfortably inside 32 bits.

**Complexity:** `O((n + q) · log q)` time, `O(n)` space.
