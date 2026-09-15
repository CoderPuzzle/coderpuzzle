# Solutions — Tree Node

## One CASE over two membership facts

A node's type is decided by two independent facts about the row set: the
node's own `p_id` — NULL exactly for the root, the one node nobody parents —
and whether its `id` value ever appears in some other row's `p_id`, which is
precisely the statement "this node has a child". A `CASE` expression turns
the pair into the three-way label, and the order of its `WHEN` arms is part
of the design: the root test must come first, because in the single-node
tree the root also has no row pointing at it and a leaf arm placed above
would claim it — with `WHEN p_id IS NULL THEN 'Root'` on top, the childless
test that follows catches exactly the leaves, and `ELSE` collects the nodes
with both a parent and children.

The child test is where the one real trap lives. Writing it as
`id NOT IN (SELECT p_id FROM Tree)` quietly returns no leaf at all: the
subquery scans the whole `p_id` column, which includes the root's own NULL
row, and under SQL's three-valued logic `x NOT IN (..., NULL, ...)` is
unknown for every `x`, so the arm never fires and every leaf falls through
to `ELSE` as an inner node. Filtering the subquery —
`WHERE p_id IS NOT NULL` — keeps the comparison in two-valued logic and
fixes it; a correlated
`NOT EXISTS (SELECT 1 FROM Tree c WHERE c.p_id = Tree.id)` repairs it the
other way, since the equality never matches a NULL `c.p_id` in the first
place, and a `LEFT JOIN` onto the distinct non-NULL `p_id` values spells
the same membership as join arithmetic. No `ORDER BY` is needed: the
statement allows any row order, and the judge compares result rows as an
unordered multiset.

The subquery is uncorrelated, so the engine can evaluate it once and answer
each row's membership test by lookup: one scan builds the parent-value set
and one pass labels the `n` rows, with nothing beyond that set
materialized.

**Complexity:** `O(n)` time, `O(n)` space.
