# Solutions — Maximum XOR of Two Non-Overlapping Subtrees

## Euler DFS with a Binary Trie of Finished Subtrees

Every subtree is identified by its root, and its score contribution is its subtree sum, so the first job is computing `subtree_sum[v]` for all `v` — done without recursion by collecting a DFS visit order, then accumulating children into parents in reverse order. Since two rooted subtrees overlap exactly when one root is an ancestor of the other, the task becomes: over all pairs of nodes where neither is an ancestor of the other, maximize the XOR of their subtree sums.

The pairing constraint is handled by timing. Run one DFS and maintain a binary trie holding the sums of _already finished_ subtrees — nodes whose entire subtree has been popped off the stack. When a node `v` is first entered, nothing inside `v`'s subtree has been inserted yet, and no ancestor of `v` has finished (ancestors are still open on the stack), so every trie entry is a completed subtree disjoint from `v`'s: exactly the legal partners. Querying the trie with `subtree_sum[v]` at entry time therefore yields the best XOR available to `v`, and after `v`'s subtree is fully popped, its own sum is inserted to serve later disjoint subtrees.

The trie stores numbers as fixed-width bit strings, width taken from the largest subtree sum's bit length. A maximum-XOR query walks from the most significant bit down, always following the child holding the opposite bit when it exists (setting that bit in the result) and falling back to the same-bit child otherwise; this greedy is optimal because earlier bits dominate later ones. Node storage is a flat array of child pairs, indexed rather than object-linked, which keeps allocation cheap at this scale. The empty trie at the start returns 0 harmlessly, matching the "impossible" fallback of Example 2 — and since values are positive, disjoint subtrees genuinely exist only where two branches diverge.

Each node is inserted once and queried once at `O(B)` per trie operation, where `B` is the bit width of the largest sum (about 46 for the constraint limits). The traversal itself is linear, giving `O(n·B)` overall; the trie can hold up to `n` numbers of `B` bits.

**Complexity:** `O(n·B)` time, `O(n·B)` space.
