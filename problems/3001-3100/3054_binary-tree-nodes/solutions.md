# Solutions — Binary Tree Nodes

## One CASE over parent and child membership

Each row already carries the evidence for its own label. `P IS NULL`
singles out the root — the one node nobody else lists as a child — and
being an inner or leaf node is the membership question of whether this
row's `N` appears in some other row's `P`. A `CASE` expression turns the
pair of tests into the three-way label, and arm order is part of the
design: in a single-node tree the root is childless too, so the root test
must sit above the leaf test or it would be mislabeled; `ELSE` then
collects exactly the nodes with both a parent and a child.

The leaf test hides SQL's one real trap here. Written as
`N NOT IN (SELECT P FROM Tree)` it never fires: the root's own row puts a
NULL into the subquery, and under three-valued logic
`x NOT IN (..., NULL, ...)` is unknown for every `x`, so every leaf falls
through to `ELSE` as an inner node. Filtering the subquery —
`WHERE P IS NOT NULL` — keeps the comparison two-valued; a correlated
`NOT EXISTS (SELECT 1 FROM Tree c WHERE c.P = Tree.N)` repairs it the
other way by never comparing against a collected NULL at all.
`ORDER BY N` returns the rows in the statement's ascending order, though
the judge compares result rows as an unordered multiset either way.

**Complexity:** `O(n)` time, `O(n)` space.
