# Solutions — Shortest Bridge

Every flip turns one water cell to land, so a cheapest connection is a
4-connected chain of flipped `0`'s running from the first island to the
second — a shortest-path question in disguise, where the nodes are cells and
each flipped cell along the chain costs exactly 1. The work splits into two
phases: first tell the two islands apart, then measure the cheapest chain
from one to the other.

## Flood one island, then expand breadth-first to the other

A row-major scan meets the first island at its topmost-leftmost cell; an
iterative flood fill from there marks exactly that island's cells and
collects them as the starting frontier. With the frontier seeded from every
cell of island 1 rather than from a single point, one breadth-first sweep
outward over the water measures the chain length in the large: each BFS
layer is precisely the set of cells reachable by crossing one more `0`, so
the layer index counts the flips used so far. The moment a frontier cell
looks across at unvisited land, that land can only be island 2, and the
count so far is the answer. Marking a cell when it enters the frontier, not
when it leaves, is the detail that keeps every cell enqueued at most once.

The queue, not recursion, is the load-bearing choice in both phases. A
recursive fill walks the island as a call chain, and nothing in the
constraints bounds that chain's length: an island one cell wide can snake
through most of a `100 x 100` grid, chaining thousands of cells deep — past
any call stack a submission is granted, in every language here. The explicit
queue holds that depth on the heap instead, where the whole grid fits
trivially. Since every cell enters the frontier at most once and is examined
through at most four neighbours, the whole pass is linear in the grid; the
answer itself is at most `2n - 3 = 197` flips at the constraint ceiling,
far inside a 32-bit integer.

**Complexity:** `O(n²)` time, `O(n²)` space.
