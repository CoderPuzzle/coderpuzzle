# Solutions — Binary Tree Longest Consecutive Sequence

## Depth-first search, run ending at each node

The quantity that cracks the problem is not the whole path but the prefix of it: for every node, the length of the longest consecutive run **ending** at that node. Since a path may never climb back to its parent, that run is settled entirely by the parent's run — one step longer when the child's value is exactly `parent.val + 1`, and a fresh 1 otherwise; nothing below a node can change it. The answer is then just the maximum over all nodes, which is why a run may start anywhere, not only at the root.

The traversal is depth-first with an explicit stack. Each node is processed with its run length already in hand: it updates the global maximum, parks its right child on the stack with the child's own run length, and descends the left spine; when a spine bottoms out, the most recently parked right child is popped and its spine walked the same way. The stack never holds more than one parked branch per level, so the sweep is a single pass of one visit per node. Iteration is deliberate: the constraint ceiling is a single `3 * 10⁴`-node chain, and a run down it nests 30000 calls — past CPython's default recursion limit and past the call stacks the judge gives several runtimes (Java gets 512k, V8 about one megabyte), while an explicit stack behaves identically in all seven languages.

Direction and step size are the two traps the run length settles by construction. Only increasing-by-one steps extend: a child equal to, two above, or below its parent restarts at 1, so `[9,8,7,6]` never counts and neither does a `+2` ladder. And because the run is measured parent-to-child only, the example's `3-2-1` never forms — the path `2-3` is what the parent-to-child direction permits.

**Complexity:** `O(n)` time — each node is visited exactly once — and `O(h)` space for the parked branches, where `h` is the tree's height: `O(log n)` for a balanced tree, `O(n)` worst case for a skewed chain (up to `3 * 10⁴` nodes).
