# Solutions — Binary Tree Longest Consecutive Sequence II

## Post-order depth-first search, runs turning at each node

The part-I quantity — one run length per node — no longer suffices, because a
path here may climb or descend. Each node therefore reports a pair: the
longest run topping out at the node whose values step `+1` downward away from
it (`inc`), and the longest stepping `-1` (`dec`). The children's reports
settle the pair completely — a child valued exactly `node.val + 1` extends
`inc` by that child's own `inc`, a child valued `node.val - 1` extends `dec`,
and any other child (equal, or off by more than one) extends nothing — so the
information only ever flows upward, which makes post-order the shape of the
problem itself.

A valid path is monotone, and in a tree a monotone path turns at exactly one
node: the path's topmost node, where one arm descends into each child subtree
— the child-Parent-child order the statement allows. Climbing one arm reversed
into a descent of the other turns the two reports into one path of length
`inc + dec - 1` (the `-1` keeps the turn node from being counted twice), which
is why the answer never needs a path to be built at all. A straight run is
just the degenerate turn with one arm empty, and no conflict hides in the
pairing: an arm can extend `inc` past length 1 only from a `+1` child and
`dec` only from a `-1` child, so two non-trivial arms necessarily hang off
different children — `[2,1,3]` turns at the 2 into the length-3 path `1-2-3`,
while `[1,2,3]` cannot turn anywhere and stays at 2.

The answer is the maximum of that candidate over all nodes, collected in the
same sweep that computes the reports. The traversal is iterative in every
language: the constraint ceiling is a single `3 * 10⁴`-node chain, and walking
it recursively nests 30000 calls — past CPython's default recursion limit and
over the 512k stacks the judge hands Java and Node. An explicit stack of
frames stands in for the call stack; each frame is a node, which child remains
to visit, and the two child runs already collected, so the sweep still judges
every node exactly once.

**Complexity:** `O(n)` time — each node is judged exactly once — and `O(h)`
space for the explicit stack, where `h` is the tree's height: `O(log n)` for a
balanced tree, `O(n)` worst case for a skewed chain (up to `3 * 10⁴` nodes).
