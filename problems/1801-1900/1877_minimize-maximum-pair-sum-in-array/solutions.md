# Solutions — Minimize Maximum Pair Sum in Array

Trying to decide pairs locally has no safe greedy order until the array
is sorted: the largest element must be paired with something, and its
partner choice alone can dominate the answer. Sorting turns the question
into a simple matching rule that an exchange argument proves optimal.

## Sort and pair extremes

Sort `nums`, then pair `nums[i]` with `nums[n - 1 - i]` for
`i < n / 2` and return the largest such sum. If a sorted pairing ever
matched the current maximum with anything but the smallest remaining
element, swapping partners cannot increase any pair sum, so the extreme
pairing minimizes the maximum.

The largest possible pair sum is `10^5 + 10^5 = 2 * 10^5`, which fits in
32 bits; the running maximum is what is returned, so 64-bit accumulators
are not even needed — but they cost nothing and keep headroom.

**Complexity:** `O(n log n)` time for the sort, `O(n)` space (or `O(1)`
extra when sorting in place).
