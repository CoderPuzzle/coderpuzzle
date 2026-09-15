# Solutions — Minimum Cost to Merge Sorted Lists

## Bitmask dynamic programming

However the merges are ordered, each merge's cost depends only on the two
collections being combined: the sum of their lengths and the medians of their
merged multisets. A full merge schedule is therefore a binary tree whose
internal nodes are subsets of the at most 12 input lists, and the cost of a
node depends only on which lists sit in its two subtrees. That makes
`dp[mask]` — the cheapest way to fold every list in `mask` into one — the
natural state: the last merge of `mask` splits it into two nonempty halves
`s` and `mask ^ s`, paying `dp[s] + dp[mask ^ s]` for the recursive folds
plus `len(a) + len(b) + abs(median(a) - median(b))` for the final join.

The length part of that join is just `mask`'s total length, precomputed for
every mask in one pass by peeling off the lowest set bit, so only the median
term varies between splits. Each mask's median — the left middle of its
merged multiset — never requires building that merged list: binary search
the pooled sorted values for the smallest value with more than half the
mask's elements at or below it, counting each member list with its own
binary search. The recurrence then enumerates every submask split once per
unordered pair and keeps the cheapest, which is the classic `O(3^n)`
subset-DP sweep — about half a million split evaluations at `n = 12`.

Arithmetic width is the remaining trap: a single merge can cost up to
`2000 + 2 × 10⁹`, and a tree performs 11 of them, so totals reach roughly
`2.2 × 10¹⁰` — past 32-bit range and the reason the answer travels as a
64-bit integer. JavaScript's doubles stay exact here since every value sits
far below `2⁵³`. Median precomputation costs `O(2^n · n · log² S)` for
`S` total elements, dominated by the split sweep.

**Complexity:** `O(3^n + 2^n · n · log² S)` time, `O(2^n + S)` space.
