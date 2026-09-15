# Solutions — Longest Subsequence With Limited Sum

## Sort, prefix sums, binary search per query

Order does not matter for a subsequence chosen freely, so the longest one
under a sum cap always consists of the smallest elements. Sorting `nums`
and taking prefix sums turns each query into: how many prefix sums are
less than or equal to the query? That count is the answer, found by
binary search over the monotone prefix array — the first prefix sum that
exceeds the query marks the boundary.

**Complexity:** `O((n + m) log n)` time for the sort and per-query
searches, `O(n)` space.
