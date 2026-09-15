# Solutions — Minimum Score After Removals on a Tree

## Subtree XORs with Euler intervals, every edge pair once

Root the tree at node 0 and identify each edge with its child endpoint, so
choosing two distinct edges means choosing two distinct non-root nodes x
and y. One iterative DFS with an explicit stack stamps entry times tin and
exit times tout — the half-open interval [tin[u], tout[u]) is exactly u's
subtree, which turns "is a an ancestor of b" into a constant-time range
check — and folds sub[u], the XOR of every value in u's subtree, into each
node's parent on the way back up.

Cutting above x and above y yields three components whose XORs follow one
question: how do the two subtrees sit relative to each other? If the
subtrees are disjoint, the components are the two subtrees themselves plus
everything else, so their XORs are sub[x], sub[y], and total ^ sub[x] ^
sub[y]. If x is an ancestor of y, subtree(y) comes out of subtree(x)
intact, leaving sub[y] for the inner piece, sub[x] ^ sub[y] for the rest
of x's subtree, and total ^ sub[x] for everything above x. If y is an
ancestor of x the same three formulas hold with the roles swapped. The
three extracted XORs xor back to total in every case, as they must: the
components partition the node set, so their XORs must partition the whole.
Every pair of non-root nodes falls in exactly one case, so with the tables
in hand each pair costs constant time: take max minus min over the three
candidate XORs and keep the smallest difference seen.

Both passes are iterative — the DFS drives its own stack instead of
recursing — so even a straight chain of 1000 nodes, the constraint's
deepest shape, never touches a call-stack or recursion limit.

**Complexity:** `O(n²)` time, `O(n)` space.
