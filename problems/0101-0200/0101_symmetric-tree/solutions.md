# Solutions — Symmetric Tree

## Two-branch mirror recursion

A tree is symmetric around its center exactly when the root's two children are mirrors of each other — and two subtrees are mirrors when their values agree while the outer pair (left's left with right's right) and the inner pair (left's right with right's left) are themselves mirrors. That definition is already recursive, so the code restates it directly: `mirror(a, b)` settles structure first, because two missing subtrees match while exactly one missing is a shape difference no value can repair, and only then compares the two values and descends.

The crossing is the whole trick. Pairing `a.left` with `b.left` would test for identical subtrees — the Same Tree question — rather than mirrored ones; symmetry lives on opposite sides of the axis, so every step crosses to the far side. The short-circuit `and` stops at the first disagreement, so a near-miss costs one root-to-leaf path instead of the whole traversal, and no node is ever visited in more than one pair.

The tree holds at most 1000 nodes, so the recursion depth is bounded by its height — even a pair of mirrored chains under one root stays well inside every language's default call stack. The follow-up's iterative version is the same check with an explicit queue of pairs in place of call frames, and returns identical answers.

**Complexity:** `O(n)` time — each node appears in exactly one compared pair — and `O(h)` space for the recursion stack, where `h` is the tree height.
