# Solutions — Number of Good Pairs

## Count by frequency

A good pair only cares about which value the two positions share, not where
they sit in the array. So instead of comparing every pair of positions
directly, first tally how many times each value occurs. If a value occurs
`c` times, every one of those `c` occurrences pairs with every other
occurrence that comes after it, contributing exactly `c * (c - 1) / 2` good
pairs — the count of unordered pairs among `c` items.

The algorithm walks `nums` once, keeping a running count for each value seen
so far. Before updating the count for the current value, it adds the current
count to the running total: the `k`-th occurrence of a value forms a good
pair with each of the `k - 1` occurrences already counted, so summing those
contributions across the whole array reproduces `c * (c - 1) / 2` for every
value without ever materializing the pairs themselves. Summing over all
distinct values gives the final answer.

**Complexity:** `O(n)` time, `O(n)` space.
