# Solutions — Maximum Average Subtree

## Post-order subtree sums and sizes

Every subtree's aggregate is the pair (sum of values, number of nodes), and
a parent's pair is just the component-wise sum of its own value plus its two
children's pairs. So one post-order walk computes every subtree's pair, and
the answer is the largest `sum / size` seen along the way.

The walk is written with an explicit stack rather than recursion: a
pre-order stack pass lists the nodes, and processing that list **in reverse**
visits every child before its parent — pre-order places each descendant
after its ancestor, so reversal is a valid post-order for aggregation. Each
node's pair is stored in a hash map keyed by the node itself, so a parent
reads its children's pairs in `O(1)` and writes its own. The explicit stack
matters here: the tree may be a degenerate chain up to 10⁴ deep, far past
the recursion budget of the judged runtimes.

Sums use 64-bit arithmetic — 10⁴ nodes of value 10⁵ sum to 10⁹, beyond
32-bit range — and each candidate average is compared as a float division
once per node.

**Complexity:** `O(n)` time — each node is pushed, popped, and aggregated
exactly once — and `O(n)` space for the node list and the pair map, plus
the explicit stack, which peaks at the tree's width rather than its depth.
