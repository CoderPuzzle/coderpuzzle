# Solutions — Find Mode in Binary Search Tree

Both approaches run the same census — visit every node, tally values, and
report the values carrying the largest tally — and they differ in where
the tallies live. The hash map counts each value in a table keyed by the
value itself, so the walk may take the nodes in any order at all and the
tree's ordering goes entirely unused; the bill is a counter table sized
by the number of distinct values, plus a closing sort to pin the
survivors' order. The inorder streak spends the BST property to retire
that table: in an ascending walk every copy of a value arrives
consecutively, so two stack-only passes measure the longest run of equal
values and read off the modes — the follow-up's no-extra-storage answer,
with ascending output falling out of the walk for free.

## Hash counts, then group by count

Counting never needed the BST ordering: the modes are a property of the
multiset of values, whatever order a walk meets them in. So this
approach takes the tree as an ordinary container. An explicit stack pops
a node, tallies its value into the table, and pushes the children —
preorder, inorder, any order at all, the table cannot tell the
difference — until the tree is spent. The walk is iterative for the same
reason the streak walk is: the tree may be a single 10^4-node chain,
whose traversal would nest 10000 calls, past the recursion limits this
judge's runtimes hand out.

Grouping by count is then two passes over the table. One scan of the
entries finds the largest count; a second collects every value whose
count reaches it. The collection inherits no order the way the streak
walk inherits ascending order from inorder — a hash table's iteration
order is arbitrary — so the survivors are sorted once at the end. That
sort is the approach's only work beyond the linear tally, and it sorts
at most one value per distinct key the tree actually contains.

**Complexity:** `O(n + m log m)` time — `n` for the walk and the tally,
`m log m` for the closing sort of the `m` surviving modes — and
`O(d + h)` space: one table entry per distinct value, plus the stack's
one entry per level of height.

## Inorder streaks, two passes

Inorder visits a BST's values in ascending order, so all copies of a value
arrive consecutively: a mode is simply the longest run of equal values in
the walk, and no counter table keyed by value is ever needed. The walk here
is iterative — it carries its own stack of nodes down the left spine —
because the tree may be a single 10^4-node chain, deeper than the recursion
limits this judge's runtimes hand out.

Two passes over that one walk do the whole job. The first pass only
measures: it keeps the value just emitted and how many times it has come
up in a row, and remembers the longest such streak — nothing else is
stored. The second pass walks again with the streak bookkeeping reset and
emits a value at exactly the moment its streak reaches that maximum — once
per mode, and because inorder ascends, already in ascending sorted order.

**Complexity:** `O(n)` time, `O(h)` space for the explicit traversal stack,
where `h` is the tree's height.
