# Solutions — Minimize Hamming Distance After Swap Operations

## Union-Find Components with Multiset Matching

The allowed swaps partition the indices: any chain of swaps lets you permute the values inside a connected component of the "swap graph" arbitrarily, since transpositions along a connected graph generate the full symmetric group on that component. Conversely, values can never leave their component. So the achievable minimum Hamming distance decomposes per component: in each component, compare the multiset of `source` values against the multiset of `target` values — every target value with no matching source value in the same component is a position that must stay different.

The code builds a disjoint-set forest over indices with path halving, unioning the endpoints of every allowed swap. A second pass groups all indices by their root. For each group it counts the source values with a `Counter`, then walks the group's indices: if `target[i]` still has an available count it is matched (decrementing the counter), otherwise the distance grows by one. Matching greedy-in-place is valid because only counts matter, not which exact index supplies which equal value.

Each unmatched target element contributes exactly one to the answer, and the sum over components is the global minimum — no swap can fix a mismatch across components, and within a component all mismatches that are fixable are fixed. Components of size one (indices in no swap) fall out naturally, matching the no-swap baseline.

**Complexity:** `O((n + S) α(n))` time, `O(n)` space.
