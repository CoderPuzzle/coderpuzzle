# Solutions — Longest Increasing Subsequence II

## Value-indexed segment tree

Think in value space rather than index space: let `best[v]` be the length of the longest valid subsequence, among the elements processed so far, that ends with the value `v`. Scanning left to right keeps index order for free — when element `x` arrives, only earlier elements are recorded. Its predecessor in the subsequence must be some value in `[x - k, x - 1]` (strictly smaller, difference at most `k`), so `best[x] = 1 + max(best[v])` over that window, a range-maximum query.

The window query and the subsequent point update are both served by an iterative max segment tree indexed by value, sized to the next power of two above the `10^5` value bound (131072 leaves, lazily covering any smaller maximum). The update climbs from the leaf and stops as soon as an ancestor already holds a value at least as large, so writing a shorter subsequence ending at `x` never overwrites a longer one; the range query is the standard bottom-up walk over the inclusive interval `[max(1, x - k), x - 1]`, clamped at the lower end because values are at least 1.

The answer is the largest value ever written, tracked as the scan proceeds. Each element costs one query and one update, both logarithmic in the value range, which meets the follow-up bound of `O(n log m)` where `m` is the maximum value.

**Complexity:** `O(n log m)` time, `O(m)` space.
