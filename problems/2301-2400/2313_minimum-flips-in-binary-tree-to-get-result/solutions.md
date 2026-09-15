# Solutions — Minimum Flips in Binary Tree to Get Result

## Bottom-Up Tree DP on (min-true, min-false)

For every node define two values: `t(node)`, the minimum leaf flips needed to make the subtree rooted at `node` evaluate to true, and `f(node)`, the minimum to make it evaluate to false. Since flips happen only at leaves and the operations at internal nodes are fixed, these two numbers fully summarize a subtree for every parent — the parent does not care how a child's value is achieved, only what it costs to get either value. That makes the pair a composable DP state.

The recurrences mirror each operator. A leaf valued `1` costs `(0, 1)` and a leaf valued `0` costs `(1, 0)`. An OR node is true if either child is true — pay `min(lt, rt)` — and false only if both are false — pay `lf + rf`. An AND node is the mirror image: `lt + rt` to be true, `min(lf, rf)` to be false. A XOR node is true when the children differ, so `t = min(lt + rf, lf + rt)`, and false when they match, `f = min(lt + rt, lf + rf)`. A NOT node simply swaps its single child's two costs (the child is the left one if present, otherwise the right).

![The example expression tree with each node's (t, f) pair: leaves 1 and 0 cost (0, 1) and (1, 0), the OR resolves to (0, 1), the NOT inverts it to (1, 0), the XOR over two true leaves also costs (1, 0), and the root AND pays 1 + 1 = 2 to be true.](figures/solution-tree-dp-pairs.svg)

The canonical solution evaluates the DP iteratively to avoid recursion-depth issues on trees of up to `10^5` nodes: a BFS from the root records the nodes in level order, then the arrays `t` and `f` are filled by scanning that order in reverse, so children are always finalized before their parents. A dictionary maps each node to its index for `O(1)` child lookups. The answer is `t[root]` when `result` is true and `f[root]` otherwise; a single-leaf tree and a `None` root are handled by the leaf base case and an upfront guard. Both values are always finite because any leaf can be flipped.

**Complexity:** `O(N)` time, `O(N)` space, for a tree with `N` nodes.
