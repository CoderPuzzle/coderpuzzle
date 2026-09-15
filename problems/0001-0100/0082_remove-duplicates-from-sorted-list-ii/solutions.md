# Solutions — Remove Duplicates from Sorted List II

## Dummy head with run skipping

In a sorted list every duplicate value occupies one contiguous run, so whether a node survives can be decided by looking only at its successor: if the next node repeats the value, the whole run goes — every copy of it — and otherwise the node is distinct and stays. A dummy node placed in front of the head makes deleting the original head the same unlink as deleting any other node, so no special case exists anywhere in the walk.

The code keeps `tail` at the end of the kept prefix and repeatedly judges the node after it. When that node leads a run of equals, the walk advances `tail.next` node by node until a different value (or the end of the list) appears — `tail` itself never moves, so each link it writes drops one more copy of the duplicated value from the answer. When the values differ, the node has earned its place and `tail` steps onto it. `dummy.next` is then the surviving list, `None` itself when every value was duplicated.

Every node is judged exactly once by one forward sweep of pointer surgery. The Rust port drives the same decisions through `take()`: popping each `Box` off the front of `tail.next` hands back the chain that remains, so no node is copied and each dropped box is freed as the run is consumed.

**Complexity:** `O(n)` time, `O(1)` space.
