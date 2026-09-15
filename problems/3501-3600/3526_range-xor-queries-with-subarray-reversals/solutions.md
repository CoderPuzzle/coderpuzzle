# Solutions — Range XOR Queries with Subarray Reversals

## Treap with Split/Merge and Lazy Reversal

The array is stored as a balanced binary search tree keyed implicitly by position — a treap. Each node carries a random priority (drawn from a fixed-seed linear congruential generator so runs are deterministic) plus subtree size and subtree XOR. Because XOR is self-inverse and combines associatively, the XOR of any segment is simply the augmented value stored at the root of the subtree covering that segment, so no rebalancing trickery beyond size bookkeeping is needed.

All three operations reduce to split and merge. split(root, k) divides the tree into the first k elements and the rest by descending with subtree sizes; merge joins two treaps by priority. A point update splits out the single node at the index and rewrites its value; a range XOR query splits out [left, right] and reads its root's xor field; a reversal splits out the segment and toggles a lazy rev flag on it. The flag is applied on demand in push — swap the two children and flip their flags — before any descent touches a node, and pull recomputes size and xor from the children after every structural change. Lazy propagation is what makes a reversal O(log n) instead of a full rewrite.

The treap is built by merging one node at a time onto the right end, which costs O(log n) per element. Empty subtrees contribute size 0 and XOR 0, so split/merge handle boundaries uniformly, and every query re-merges the three pieces in the same left-to-right order to restore the sequence.

**Complexity:** `O((n + q) log n)` time, `O(n)` space.
