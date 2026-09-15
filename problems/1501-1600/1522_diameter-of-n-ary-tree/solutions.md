# Solutions — Diameter of N-ary Tree

Both methods stand on the same fact: every longest path bends through
exactly one node — the highest point of the path — and its length is the
sum of the two tallest downward arms leaving that node plus the two edges
that tie the arms to it. Any path between two nodes climbs to their lowest
common ancestor and descends on both sides, so no longest path can dodge
this shape, and a single arm hanging off a node covers the paths that end
at the node itself. What the methods differ in is when the answer is read:
one measures every arm first, materializes the results, and only then
looks for the widest bend, while the other keeps a running best beside the
recursion that does the measuring.

## Height table with a second scan

An arm's length from a node is that node's height: zero for a leaf, one
more than the tallest child's height for anything else. Pass one is a
post-order recursion that fills a table keyed by node — each node's
children are measured before it, its own height lands in the table, and
the recursion hands that height back up to its parent. Pass two never
measures anything: it walks the finished tree with an explicit stack, and
at each node reads the children's heights straight out of the table.

The bend through a node pairs its two tallest arms. Scanning the children,
`first` and `second` hold the two largest heights seen, both seeded with
`-1` so an absent arm reads as minus one: a leaf scores `-1 + -1 + 2 = 0`,
a node with one child scores that arm plus one — the path that ends at the
node itself — and a node with two or more scores the full
`first + second + 2`. Seeding with zero instead would silently undercount
every single-arm bend by one, and on a straight chain that undercount is
the whole answer. The diameter is the largest bend any node reports.

Splitting the work this way costs one extra walk of the tree, but buys a
clean division: the recursion only computes heights, and the scan that
picks the widest bend is iterative, reading table entries rather than
waiting on call returns.

**Complexity:** `O(n)` time, `O(n)` space.

## One sweep with a running maximum

The same bend arithmetic fuses into the height recursion itself. As each
child's height comes back, the current node keeps the two largest in
`first` and `second`, seeded with `-1` exactly as above; once every child
has reported, the node raises the running best to `first + second + 2`
and returns `first + 1` as its own height. Nothing is stored between
calls and no node is ever revisited: a node's bend is scored at the one
moment its last child finishes, which is precisely when all the numbers
it needs are in hand.

The seeding does the degenerate work. A leaf never enters the loop, scores
`-1 + -1 + 2 = 0`, and returns height `0`. On a straight chain of `k`
nodes the root finally scores `(k - 2) + -1 + 2 = k - 1` — the whole chain
is a single-arm bend at the top, with the root itself as the upper
endpoint — and every deeper node scores less, so the running maximum ends
at the full length without any second pass.

The fold is the whole method: the answer is assembled on the way out of
the one traversal, so the space bill is the recursion stack alone.

**Complexity:** `O(n)` time, `O(n)` space.
