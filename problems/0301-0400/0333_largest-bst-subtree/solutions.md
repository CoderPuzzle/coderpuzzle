# Solutions — Largest BST Subtree

## Post-order depth-first search

What a node needs in order to be judged is settled entirely below it: whether each child's subtree is a BST, how many nodes it holds, and the range of values inside it. From those two reports the node's own verdict follows — its subtree is a BST exactly when both children's subtrees are and `left.max < node.val < right.min` — so nothing a parent can do repairs a broken child, verdicts only flow upward, and post-order is the shape of the problem itself. Each report that comes back `true` carries the subtree's size, and the answer is the largest size ever reported.

The min and max in the report are the two details that make the check sound: they must summarize the whole subtree, not just the immediate children, because a value can sit arbitrarily deep and still break an ancestor far above. In `[10,5,15,1,8,null,7]` the right side looks well-formed at the top — 7 sits below 15 as it should — yet 7 also sinks below the root 10, so the root's subtree is not a BST and the answer is the left subtree `[5,1,8]` with size 3. Base cases fall out of the same rule: a single node is a BST of size 1, an absent child is an empty BST that never breaks its parent, and an empty root returns 0 without special handling.

The traversal is iterative in every language: the constraint ceiling is a single `10⁴`-node chain, and judging it recursively nests 10000 calls — past CPython's default recursion limit and over the 512k stacks the judge hands Java and Node. An explicit stack of frames stands in for the call stack; each frame is a node, which child remains to visit, and the two child reports already collected, so the sweep still visits every node exactly once.

**Complexity:** `O(n)` time — each node is visited exactly once — and `O(h)` space for the explicit stack, where `h` is the tree's height: `O(log n)` for a balanced tree, `O(n)` worst case for a skewed chain (up to `10⁴` nodes).
