# Solutions — Count Connected Subgraphs with Even Node Sum

With at most thirteen nodes, every non-empty node subset can be represented by
one integer mask and checked directly.

## Bitmask enumeration and BFS

Store each node's neighbors as a bitmask. For every nonzero subset mask, scan
its set bits to compute the parity of the selected node values; an odd subset
cannot contribute. For an even subset, start from its lowest set bit and run a
bitset breadth-first search restricted to nodes in the subset. The induced
subgraph is connected exactly when the reached mask eventually equals the
subset mask.

There are `2ⁿ - 1` subsets, and each parity and connectivity check examines at
most `n` nodes. The masks fit comfortably in ordinary integers because
`n <= 13`.

**Complexity:** `O(n * 2ⁿ)` time, `O(n)` space.
