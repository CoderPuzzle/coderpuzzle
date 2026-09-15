# Solutions — Maximal Network Rank

## Degree counting with an adjacency-set adjustment

The network rank of two cities is almost just the sum of their
degrees — the only wrinkle is that a road directly connecting the two
cities gets double-counted by that sum and must be subtracted back
out. So the approach is two passes: first tally `degree[city]` by
scanning `roads` once, incrementing both endpoints; then, separately,
record every road in a hash set (as a canonical pair, e.g. the smaller
city first) so "are these two cities directly connected" is an `O(1)`
lookup.

With both structures built, every pair of distinct cities `(i, j)` is
tried: its rank is `degree[i] + degree[j]`, minus one if `(i, j)` is
present in the adjacency set. The maximum over all `O(n^2)` pairs is
the answer. Because `n` is at most 100, enumerating every pair
directly is cheap, and the hash-set membership test keeps each pair's
work constant instead of rescanning `roads`.

**Complexity:** `O(n^2 + roads.length)` time, `O(n + roads.length)`
space.
