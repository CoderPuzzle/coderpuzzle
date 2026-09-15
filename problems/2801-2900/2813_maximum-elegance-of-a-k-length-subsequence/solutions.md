# Solutions — Maximum Elegance of a K-Length Subsequence

## Greedy Exchange over Sorted Profits

Start from the natural candidate: sort the items by profit in descending order and take the top `k`. This maximizes the profit term, but possibly at the cost of distinct categories. The insight is that any better solution differs from this one by swapping some chosen items for lower-profit items that introduce new categories: since the elegance is `total_profit + distinct^2`, one extra distinct category is often worth more than the profit lost.

Process the remaining items in descending profit order. An item is only worth considering if its category is not yet represented — adding a duplicate category can never help. To fit it into the size-`k` selection, remove the smallest-profit item whose category appears more than once among the chosen ones; that victim is the cheapest sacrifice that keeps the size at `k` while raising `distinct` by one. Each such swap updates the running total, increments `distinct`, and records a new candidate answer. The initial top-`k` elegance is also a candidate, which covers the case where no swap is ever profitable (or all categories are already distinct).

The implementation replaces the usual min-heap of duplicate-category items with a list of `(profit, category)` pairs from duplicated categories, pre-sorted ascending. Because nothing is ever pushed after construction, a moving pointer reproduces heap-pop order; entries whose category count has since dropped to one are skipped, since evicting them would reduce `distinct` back down. The loop stops early once no duplicate-category victim remains, as further new categories could no longer be accommodated. Note the swap is only _recorded_, never re-ranked — later items are processed against the evolving selection, and the maximum over all recorded states is returned.

**Complexity:** `O(n log n)` time, `O(n)` space.
