# Solutions — Inorder Successor in BST

## Binary search descent

The successor is the node with the smallest key greater than `p.val`, and a
BST answers smallest-greater questions by guided descent rather than
traversal. Start at the root: step left while `p` is smaller than the node's
value, right while it is larger. Every left step lands on a node that beats
all earlier candidates — smaller than each of them, still greater than `p` —
so remembering the last node the walk stepped left from keeps the best
candidate current. The descent ends at `p` itself.

When `p` has a right subtree, every value in it is greater than `p`, and the
smallest node there — the leftmost one, reached by one more left-only walk —
is the successor. When it has none, the successor is an ancestor: the last
node the descent stepped left from, precisely the candidate already
remembered. No left step ever happened and no right subtree exists exactly
when `p` is the largest value in the tree, and the answer is `null` — an
empty array on this bundle's wire, which carries the returned node as its
subtree in level-order form.

The walk touches one root-to-`p` chain and at most one left spine below
`p` — together no more than the tree's height.

**Complexity:** `O(h)` time, `O(1)` space — `h` is `O(log n)` for a balanced
tree and `O(n)` for a degenerate chain.
