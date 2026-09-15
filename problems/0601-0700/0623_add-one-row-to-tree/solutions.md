# Solutions — Add One Row to Tree

## Breadth-first walk to depth - 1, splice in place

The insertion row sits at a fixed depth, so the algorithm's whole job is
getting there. A frontier list starts as the root's own level and steps down
one round per level, collecting each frontier node's non-null children, until
it holds exactly the nodes at depth - 1 — the splice points. Nothing above
them is modified and nothing below them is even visited on the way down; the
walk's cost is bounded by the levels it crosses, not the whole tree.

The splice itself re-parents rather than rebuilds. Each frontier node `cur`
trades its two child slots for two fresh nodes carrying `val`: the old left
subtree hangs under the new left node's left, the old right subtree under the
new right node's right — every subtree below depth - 1 keeps its exact shape,
merely one level deeper. Neither boundary case needs its own code path beyond
the statement's `depth == 1` rule, where no depth 0 exists to splice under, so
the original tree wholesale becomes a fresh root's left subtree. At the other
boundary, `depth == depth-of-tree + 1` — the largest the constraints allow —
the frontier is the tree's deepest level, so every node on it is a leaf and
each grows a pair; a sparse tree's shallower leaves are not on the frontier
and correctly receive nothing.

The frontier walk iterates deliberately: the tree may legally be a single
10^4-node chain, and a recursive descent would nest 10000 calls — past
CPython's default recursion limit and over the 512k stacks the judge hands
Java and Node. Iterating also keeps the footprint to one level: the frontier
never holds more nodes than the widest level crossed.

**Complexity:** `O(n)` time — each node enters the frontier at most once, and
the splice itself touches only the frontier — and `O(width)` space for the
frontier, where `width` is the tree's widest level.
