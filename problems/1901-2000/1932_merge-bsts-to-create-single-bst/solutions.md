# Solutions — Merge BSTs to Create Single BST

## Leaf-value map with one validation pass

The merge structure is fixed by values, not choices: a tree can only attach
under the leaf whose value equals its root, and every leaf value can match at
most one pending root (two trees claiming one leaf would duplicate a value,
which no valid BST allows). So count leaf values, find the single root that
never appears as any other tree's leaf — that root must be the final root —
then attach greedily: repeatedly splice each tree under the node whose value
equals its root.

After all `n − 1` splices the result must still be checked: the assembled
tree has to be a valid BST (strictly increasing in-order) and it must contain
every node exactly once. The in-order walk doubles as the duplicate check —
any repeated or out-of-order value fails immediately. Because each input tree
has at most 3 nodes and children never have grandchildren, attachment is a
constant-time leaf replacement; the whole algorithm is dominated by the final
`O(total nodes)` walk. Depth stays below `n`, so the walk is iterative
(explicit stack) to remain safe at `n = 5·10⁴`.

If no unique candidate root exists (every root appears as some leaf), more
than one candidate survives, or the walk finds an ordering violation or a
duplicate, the answer is null; otherwise return the assembled root. Node
values are at most `5·10⁴` and totals fit easily in 32 bits.

**Complexity:** `O(m)` time, `O(m)` space, where `m` is the total number of
nodes.
