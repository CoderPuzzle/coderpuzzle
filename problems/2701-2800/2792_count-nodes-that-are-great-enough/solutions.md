# Solutions — Count Nodes That Are Great Enough

## Bounded k-smallest lists merged bottom-up

A node qualifies when two independent things hold: its subtree is large
enough, and enough of that subtree sits strictly below it. Both facts can
be read off one small structure carried up the tree. Processing nodes
post-order, each node returns the sorted list of the `min(size, k)`
smallest values in its subtree — a full listing is never needed, because
no node ever inspects more than its `k` smallest candidates. A parent
obtains its own list by pooling the two child lists with its own value —
at most `2k + 1` entries — sorting them, and keeping the first `k`.

The pooled-and-truncated list answers the test exactly. The list reaches
length `k` precisely when the subtree holds at least `k` nodes, which
settles the size condition. When it does, its last element is the
subtree's k-th smallest value counted with multiplicity, so the node's
value exceeds it if and only if at least `k` actual nodes are strictly
smaller. Multiplicity is what makes duplicates behave: in `{2,2,3}` the
value 3 faces the list `[2,2]` and clears it, while a node whose value
equals the list's last entry fails the strict comparison — a duplicate of
it never counts toward the threshold.

The merge runs bottom-up over an explicit stack, so a degenerate chain of
ten thousand nodes never touches the recursion limit; between any node's
list being built and consumed by its parent, only the lists hanging off
the current path stay alive.

**Complexity:** `O(n·k·log k)` time, `O(h·k)` space, where h is the tree height.
