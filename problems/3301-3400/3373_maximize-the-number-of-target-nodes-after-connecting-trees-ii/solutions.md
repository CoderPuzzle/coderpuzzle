# Solutions — Maximize the Number of Target Nodes After Connecting Trees II

Distance parity in a tree is the XOR of the two endpoints' depth parities
(every edge on a path flips the parity once), so "target" is exactly "same
bipartition class", and the per-query maximum splits into a tree-1 term
that depends on `i` and one shared tree-2 constant.

## Depth-parity class counting

Bipartition each tree by depth parity with one breadth-first pass from
node 0: every discovered neighbor takes the opposite parity of its parent,
and two counters track the class sizes as nodes are labeled. Nodes at even
distance from `u` are precisely `u`'s own class, so the first term of
`answer[i]` is tree 1's class size at `i`'s parity. For the second tree,
routing through the connecting edge makes `w` target to `i` exactly when
`w` sits in the opposite class of the chosen connection node `v`; picking
a different first-tree endpoint only flips which of `v`'s two classes is
wanted, and the maximum opposite-class count over `v` equals tree 2's
larger class size either way — one constant added to every `answer[i]`,
exactly as hint 3 records.

The passes are pointer walks over preallocated queues rather than
recursion, because a path of 10⁵ nodes would blow past every judged
recursion limit (CPython's 1000 frames, Java's `-Xss512k`, the trimmed
Node stack). Answers top out near `n + m ≤ 2·10⁵`, well inside 32-bit
range.

**Complexity:** `O(n + m)` time, `O(n + m)` space for the adjacency lists,
parity labels, and output.
