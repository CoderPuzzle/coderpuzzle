# Solutions — Clone Graph

## Depth-first clone with a visited map

A graph clone must materialize one fresh node per input node while rewiring every
edge, and cycles make naive recursion loop forever: the first time a node is
revisited through a back edge, its clone must already exist. The solution keeps
a map from each visited input node to its half-built clone, so a revisit is
answered by handing back the existing clone instead of descending again. Walking
depth-first from the given node, every neighbor is either new — create its
clone, register it, and recurse — or already mapped, in which case the current
clone simply links to it.

Because the map holds a clone for a node the moment that node is discovered,
the recursion terminates on cycles: each node enters the map exactly once, and
every edge is visited exactly twice (once from each endpoint), so the whole
connected component is cloned in a single pass. The input graph is connected by
contract, so one traversal from the given node covers it; an empty input
short-circuits to a null return. Values are unique per the constraints, so the
map may be keyed by either node identity or value — every language here can use
whichever its standard library hashes most naturally.

The traversal deliberately uses an explicit stack (or recursion bounded by the
node count, at most 100 deep here) rather than unbounded recursion on arbitrary
graphs. The clone map doubles as the visited set, so no separate bookkeeping is
needed.

**Complexity:** `O(V + E)` time — each node is cloned once and each edge
followed twice — and `O(V)` space for the clone map plus the traversal stack.
