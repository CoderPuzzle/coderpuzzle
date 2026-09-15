# Solutions — Count Complete Tree Nodes

Two answers to the same question at opposite ends of the effort scale. One
is the floor beneath — walk every node once and add one per visit, spending
no thought on the shape at all. The other refuses to look at what arithmetic
can count for it: probe the two spines of a subtree, and a perfect shape is
tallied in closed form, so the ragged bottom level is the only part ever
traversed.

## Full Traversal

The honest baseline: a complete tree is still a tree, and counting a tree's
nodes needs no property beyond connectivity. Walk it and add one per node
visited; when the walk ends, the tally is the answer. Nothing here reads the
completeness — the same code counts a scarecrow of a tree — and that
indifference is exactly what makes it hard to get wrong.

The walk is iterative, so no language's call stack is spent. It follows the
classic two-gear pattern: an inner loop runs down a left spine, counting and
stacking each node as it descends, and when the spine bottoms out the outer
gear pops the most recent unturned node and takes its right link — which is
the entrance to the next left spine. Every node is pushed exactly once (on
the way into its subtree) and popped exactly once (on the way out), so the
count is simply the number of pushes. Example 1's tree: the descent counts
7, 4, 2 in one go, the pop at 2 leads to nothing, and the right turns pick
up 8, then 9, 5 — six in all. An empty root never enters the loop.

The stack never holds more than one node per level — on a complete tree of
`n` nodes that is `O(log n)` — but the visits are the whole tree, `n` of
them. That is the trade the two methods embody: the traversal is linear in
what it examines, the probe method is polylogarithmic because the shape
guarantee lets it examine almost nothing.

**Complexity:** `O(n)` time, `O(log n)` space.

## Height-Probe Recursion

A complete binary tree is only ragged at the bottom: every level except possibly the last is full. That structure makes an entire subtree countable in closed form — a subtree whose leftmost path and rightmost path from the root have the same depth `d` is a perfect tree holding exactly `2^d - 1` nodes, with no per-node traversal needed.

The algorithm probes both spine depths from the current root (an iterative walk down `left` or `right` pointers). Equal depths mean the subtree is perfect, so the count is returned directly as `(1 << depth) - 1`. Unequal depths mean the last level breaks off somewhere inside, and the count falls back to `1 + count(left) + count(right)`, recursing into both children.

The key property keeping this sublinear is that whenever the heights differ, at least one of the two child subtrees must itself be perfect (the missing bottom nodes of a complete tree are all packed against the right side, so one child's last level is entirely present or entirely absent). Hence at each recursion level only one child spawns further work, the recursion is at most `log n` levels deep, and each level spends `O(log n)` on its two depth probes. An empty root returns 0 as the base case.

**Complexity:** `O(log^2 n)` time, `O(log n)` space.
