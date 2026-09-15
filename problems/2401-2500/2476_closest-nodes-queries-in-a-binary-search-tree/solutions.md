# Solutions — Closest Nodes Queries in a Binary Search Tree

## Inorder Flattening with Binary Search

A BST's inorder traversal yields its values in sorted order, so one traversal flattens the tree into a sorted array — after which the tree structure is irrelevant and each query becomes two binary searches. This trades the tree's shape (possibly degenerate) for random-access lookups, and it pays off because there can be as many queries as nodes.

For a query `q`, `bisect_right` finds the index past the last occurrence of `q`; index minus one is the largest value `<= q`, or `-1` when the index is 0, meaning every tree value exceeds the query. Symmetrically, `bisect_left` finds the first index holding a value `>= q`; if it lands past the end, no such value exists and the answer slot is `-1`. When `q` is itself present, both searches converge on it and the pair is `[q, q]`, exactly as in the query-2 example.

The traversal is iterative — a descent stack pushing left children, popping, recording, then stepping right — which avoids recursion-depth blowups on a skewed tree of up to `10^5` nodes. Duplicate-handling never arises since BST values are distinct here, but the `left/right` bisect pair would treat duplicates correctly anyway.

Total cost is one `O(n)` flattening plus `O(log n)` per query, so `q` queries cost `O(q log n)`; the sorted array of all node values is the only significant allocation.

**Complexity:** `O(n + q log n)` time, `O(n)` space.
