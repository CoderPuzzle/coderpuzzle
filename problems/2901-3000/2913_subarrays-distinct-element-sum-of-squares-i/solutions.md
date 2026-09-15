# Solutions — Subarrays Distinct Element Sum of Squares I

The sum runs over all `n(n + 1) / 2` subarrays, each scored by the square of
its number of distinct values. With `nums.length <= 100` a direct sweep over
every subarray is small enough, and the distinct counts come for free from
the subarray order: for a fixed left end, extending the right end one
element at a time changes the count by at most one.

## Left-end sweep with a growing distinct set

Fix the left end `i` and scan the right end `j` from `i` rightward, keeping
the set of values seen so far. Each step inserts at most one new value, so
`len(seen)` after inserting `nums[j]` is exactly the distinct count of
`nums[i..j]`, and adding its square accumulates the contribution of every
subarray starting at `i`. Repeating for every left end touches each subarray
once with constant work per element, `O(n²)` insertions overall against an
alphabet-bounded set size. The full answer is at most `5050 · 100² < 2³¹`,
so 32-bit accumulators suffice in the typed languages.

**Complexity:** `O(n²)` time, `O(n)` space.
