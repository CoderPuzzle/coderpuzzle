# Solutions — Finish Time of Tasks I

## Postorder tree scan

Build a children list from the parent-child edges. Since every edge points
from a parent to a child and parents appear earlier in the input, scanning
nodes in decreasing index order processes children before their parent.

For each node, store the finish time. Leaves use `baseTime`; internal nodes
combine the minimum and maximum child finish times according to the stated
formula.

**Complexity:** `O(n)` time, `O(n)` space.
