# Solutions — Vertical Order Traversal of a Binary Tree

Every node's row and column are fixed by its path from the root, so the
answer can depend on nothing beyond a `(column, row, value)` record per
node — both approaches below collect exactly that. They differ in when
the ordering is settled. The collect-then-sort walk gathers all `n`
records first and hands every ordering decision to one sort, then reads
the columns off the sorted run. The coordinate sweep orders while it
walks: each node joins its column's bucket mid-traversal, the buckets
sort only `(row, value)` pairs, and the columns emit straight from the
sorted keys — the smaller sorts and the ready-made grouping are what
keep it the reference.

## Collect all triples, sort once

The traversal is a depth-first descent carried by an explicit stack of
`(node, row, column)` frames rather than recursion — a thousand-node tree
may be one 1000-deep chain, deeper than the pinned runtimes' call stacks
are comfortable with. The descent itself keeps no answer structure: each
visited node appends its `(column, row, value)` record to one flat list
and moves on. And because the sort owns every ordering decision, the
order the walk visits nodes in is free — it happens to run root-first,
left before right, but nothing depends on that.

One sort then settles everything at once. Records ordered by `(column,
row, value)` read as columns left to right, each column's rows top to
bottom, and — where two nodes share one cell — smaller value first,
which is why example 3, the tree with two same-cell values swapped,
scores the same answer as example 2. Python, C++, and Rust compare the
records as plain tuples, so the priority comes free; Java, Go, and
JavaScript spell the three-way comparison out by hand.

Afterwards the answer is just runs: consecutive records agreeing on the
column form one group, and the run's third components, read off in
order, are that column's values. Nothing is keyed and nothing is grouped
during the walk; all `n` records ride in one list, and the single sort
that orders them compares full triples tree-wide — the same `n log n`
bill as the sweep below, paid with bigger records and a grouping pass
behind it.

**Complexity:** `O(n log n)` time, `O(n)` space.

## One coordinate sweep, sorted per column

The answer is a total order on the nodes, so one traversal that records a
`(column, row, value)` triple for every node captures all the input data the
answer can depend on. The walk is a depth-first descent carried by an
explicit stack of `(node, row, column)` frames — deliberately not recursion,
because with up to a thousand nodes the tree may be a single 1000-deep
chain, past the recursion comfort zone of the runtimes this judge pins.

Each visited node deposits its `(row, value)` pair in its column's bucket.
Sorting finishes the job: a bucket's pairs sort by `(row, value)`, so rows
read top to bottom and — the twist this problem adds to plain vertical order
— two nodes sharing one `(row, column)` cell fall back to value order,
which is exactly why the example with the two swapped nodes has the same
answer as the unswapped tree. The columns themselves emit left to right.

Every node is recorded once and joins one per-column sort of at most `n`
pairs, so the whole pass is `n log n`; the buckets and the walk stack hold
`O(n)` records between them.

**Complexity:** `O(n log n)` time, `O(n)` space.
