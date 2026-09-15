# Solutions — Number of Good Paths

## Union-find in value order

Every single node is a good path, contributing `n` right away. A multi-node good path has equal-valued endpoints, say value `v`, and interior nodes no larger than `v`. That suggests building the tree gradually: activate nodes in increasing order of value, and when activating the value-`v` nodes, union across every incident edge whose other endpoint is already active. At that moment the value-`v` nodes are connected through paths that use only nodes of value at most `v` — exactly the candidate good paths with maximum value `v`.

After processing a value group, count how many of its nodes fall into each union-find component (group them by `find` root). A component holding `c` value-`v` nodes yields `c * (c - 1) / 2` good paths, one for each unordered pair, because the unique tree path between the pair runs entirely through nodes activated so far, all `<= v`. Summing over components and over all values, then adding the `n` singleton paths, gives the total.

Grouping indices by value into buckets and iterating the distinct values in sorted order guarantees smaller values are merged before larger ones, which is what keeps every intermediate node `<= v`. Union by size with path halving makes each find effectively constant time, and each tree edge is inspected at most twice (once from each endpoint, when the later endpoint's value is processed), so the union-find work is near-linear; sorting the distinct values dominates.

**Complexity:** `O(n log n + n α(n))` time, `O(n)` space.
