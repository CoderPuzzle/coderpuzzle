# Solutions — Incremental Even-Weighted Cycle Queries

Both methods weigh each offer against the same fact: the link is safe exactly
when the parity of the path already standing between its endpoints matches the
offer's weight. They differ in where that parity is kept. The 2-coloring pins
it on the nodes themselves — one absolute bit per node, reconciled at every
merge by recoloring the smaller side — so an offer inside a component is
decided by two array reads. The parity DSU keeps the parity relative instead,
folded into the parent links of the forest, and reads it out with two finds
that never touch a component's members.

## Small-to-Large 2-Coloring

Here the labeling is kept literally: every node carries an absolute bit
`color[x]`, and a disjoint-set forest — path halving, union by size — does
nothing but membership. The invariant is that inside one component every
accepted edge `[u, v, w]` satisfies `color[u] ^ color[v] == w`. XOR-ing that
relation along the edges of any walk cancels the intermediate colors, so the
parity of each standing path equals the color difference of its endpoints —
which makes an offer between two same-component nodes a constant-time verdict:
take it exactly when `color[u] ^ color[v] == w`.

An offer whose endpoints lie in different components closes no cycle and is
always taken, but the merge must reconcile the two colorings first. When
`color[u] ^ color[v]` already equals `w` they agree as they stand; otherwise
one side must invert. Flipping either component repairs the demand: a uniform
flip leaves every relation inside the flipped component alone — both endpoints
of each internal edge move, so their XOR stands still — while toggling the
relation to the other side, which is exactly what the mismatch asked for. So
the code walks the smaller component's member list and flips each bit, then
links that root under the larger.

The small side is the whole budget. A node is recolored only when its
component is the smaller party to a merge, and that merge at least doubles the
component the node then belongs to, so each bit flips at most `log2 N` times —
`O(N log N)` recoloring in total, and the member lists, concatenated
small-into-large, cost the same. Judging stays a single sequential pass in the
statement's order: a refusal touches nothing, and every verdict reads the
state the earlier offers left behind.

**Complexity:** `O((N + E) log N)` time, `O(N)` space.

## DSU with Parity

The condition "every cycle has even total weight" can be restated as a parity-labeling problem. Imagine assigning a bit to each node; an edge of weight `w` demands that its endpoints' bits differ by exactly `w` (mod 2), so a 0-edge joins same-labeled nodes and a 1-edge joins opposite-labeled ones. All cycles are even if and only if such a labeling is consistent, which is equivalent to saying the XOR of weights along any two paths between the same pair of nodes is equal.

The solution maintains a disjoint-set union where `par[x]` stores the XOR of weights from `x` to its DSU parent. `find(x)` returns both the root and the accumulated XOR from `x` to that root, compressing paths on the way back up by XORing the accumulated values into `par`. The invariant is that for any two nodes of one component, this accumulated XOR equals the parity of every path between them, so path parity is always well defined.

Each incoming edge `[u, v, w]` is then decided in near-constant time. If `u` and `v` have the same root, the edge would close exactly one new cycle, whose total weight is `xu ^ xv ^ w`; the edge is added precisely when this is zero, i.e. when the existing path parity `xu ^ xv` already equals `w`, and rejected otherwise. If the roots differ, the edge connects two different components and creates no cycle at all, so it is always added: the two trees are linked by rank, and the new parent link gets parity `xu ^ xv ^ w` to preserve the invariant.

Because accepted edges within a component never change any path parity (they only add redundant even cycles), the check of the single new cycle is sufficient — every older cycle was already even by induction. Union by rank together with path compression keeps the amortized cost per edge effectively constant, with `alpha` the inverse Ackermann function.

**Complexity:** `O(E * alpha(N))` time, `O(N)` space.
