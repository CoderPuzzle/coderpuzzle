# Solutions — Binary Tree Vertical Order Traversal

The answer is a total order on the nodes — columns left to right, rows top
to bottom within a column, and the left-to-right reading order inside a
shared cell — and the two approaches differ in when that order is realized.
The depth-first walk collects a `(column, row, value)` record per node and
hands the whole ordering question to one stable sort afterwards, paying
`n log n` comparisons for the deferral. The breadth-first sweep instead
realizes the order as the traversal runs: its queue emits nodes already in
answer order, so each value joins its column as it is dequeued and no sort
is ever paid.

## Depth-first search, then one sort

A root-first depth-first descent carries `(row, column)` coordinates down
the tree: the root starts at `(0, 0)`, a left child is entered with its
column one less than its parent's, a right child with one more, and every
step drops one row. Each visited node appends one `(column, row, value)`
record to a flat list — the walk keeps no answer structure at all, it only
collects. Plain recursion is safe here: at most one hundred nodes means the
descent never nests deeper than one hundred frames.

One stable sort keyed on `(column, row)` then settles columns left to right
and rows top to bottom, and the stability is load-bearing, because this
statement's cell rule is reading order, not value order. Two nodes sharing
a row and a column are cousins reached by mirrored zigzags, and a
left-before-right walk visits same-depth nodes exactly in the statement's
left-to-right reading order — so the stable sort preserves the walk order
inside a cell. Sorting by value would silently swap such cousins whenever
the left one carries the larger value, which the third example exercises:
its `10` and `9` share a cell and must stay in reading order. The value
therefore rides along as payload and never enters the key.

With the records ordered, the answer is just runs of equal columns: each
time the column changes a new group opens, and each record's value is
appended to the open group.

**Complexity:** `O(n log n)` time — the walk touches each node once and the
sort dominates — and `O(n)` space for the records and the recursion frames.

## Breadth-first search with column indices

Give every node a column: the root sits at column 0, a left child one column
left of its parent, a right child one column right. A breadth-first queue that
carries (node, column) pairs then visits nodes exactly in the order the answer
needs — top to bottom, and within a row left to right — so each node's value is
simply appended to its column's list as it is dequeued. That dequeue order is
also what settles ties: two nodes sharing a row and a column enter the queue
with the left one first, because siblings are enqueued left before right.

As the traversal runs, the values accumulate in a map from column to its list,
and the smallest and largest column seen are tracked on the side. The visited
columns form one contiguous range — a column is only ever reached by a step of
one from a neighboring column — so the answer is just each column's list from
the minimum column to the maximum, with no sorting and no gaps to fill.

Depth-first search would not do: visiting a left subtree completely before the
right one dequeues a deep node in some column ahead of a shallower node in the
same column, which breaks the top-to-bottom rule the row/column sort would
otherwise have to restore. Breadth-first order makes the ordering rule a
property of the traversal itself rather than something to re-derive.

**Complexity:** `O(n)` time — each node is enqueued and dequeued once, and the
final pass walks the column range once — and `O(n)` space for the queue and the
column lists.
