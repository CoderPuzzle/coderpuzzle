# Solutions — Redundant Connection II

## Double-parent split with a union-find test

In the directed setting the one extra edge commits exactly one of two faults:
either some node ends up with two parents, or the tree stays single-parented
but an edge closes a directed cycle. A first pass over the edges recording
each node's parent edge finds the fault — and when a node `v` holds two
parent edges, the answer must be one of them, because any valid removal has
to restore "every node has exactly one parent". Let `cand1` and `cand2` be
those two edges in input order.

The second pass is a single union-find sweep that skips `cand2` and unions
every other edge. If some edge then finds its endpoints already connected,
the graph minus `cand2` still contains a cycle, so dropping `cand2` alone
cannot repair the input — and since that cycle must pass through `cand1`,
removing `cand1` mends both faults at once and it is the answer. If the
sweep runs clean, the remaining `n - 1` edges are already a rooted tree, and
`cand2` — the later of the two candidates, exactly the tie rule's
"occurs last in the given 2D-array" — is returned. When no node has two
parents, nothing is skipped and the first edge whose union fails is the one
that closes the cycle; it is the unique removable edge there.

Both passes are iterative: `find` walks to the root and then repoints every
visited node straight at it (path compression), so a 1000-node chain
flattens without ever recursing.

**Complexity:** `O(n α(n))` time, `O(n)` space.
