# Solutions — Same Tree

## Synchronous recursion on both roots

The definition of "same" — structurally identical, and the nodes have the same value — decomposes along the tree's own structure, so the check writes itself as one recursion over both roots at once. Each call first settles the structural question: if either subtree is missing, the pair matches only when both are missing, because a present node against an absent one is a shape difference no value can repair. That single guard is why `p is q` (both `None`) can serve directly as the answer for the missing cases.

When both nodes exist, their values must be equal, and the left pair and the right pair must each pass this very same test. The short-circuit `and` stops at the first mismatch, so an early difference costs one root-to-node path instead of the whole traversal, and no aligned pair is ever visited twice. Empty trees, single nodes, chains, and mirror images all fall out of the two guards with no special cases.

The trees hold at most 100 nodes, so the recursion depth is bounded by the tallest chain and cannot overflow any language's default call stack — an iterative pair-queue would work identically but adds machinery the problem does not need.

**Complexity:** `O(min(n, m))` time — at most one comparison per aligned node pair — and `O(min(hₚ, h_q))` space for the recursion stack.
