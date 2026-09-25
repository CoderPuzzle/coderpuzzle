# Jump Game III

## Approach: Breadth-first search from the start

The state space is exactly the indexes of the array: from index `i` the
only two successors are `i + arr[i]` and `i - arr[i]`, kept only when
they stay inside the array. A breadth-first search starting at `start`
therefore explores every index reachable through any sequence of jumps,
and the moment it pops an index whose value is `0` the answer is `true`.
Each index is enqueued at most once thanks to a visited mark, so the
search terminates even when jumps form cycles.

![Breadth-first search on arr [4, 2, 3, 0, 3, 1, 2] from start 5 walks the i+arr[i] and i-arr[i] jump arrows, visiting 5, 6, 4, 1, 3 while indexes 0 and 2 are never reached — popping index 3 finds the 0 and returns true.](figures/solution-bfs-jump-arrows.svg)

A queue guarantees the shortest number of jumps is found first, though
only reachability is needed here; an explicit visited array prevents
re-processing. The recursion-free traversal keeps the solution within
the stack budget for arrays as long as `5 * 10⁴`.

**Complexity:** O(n) time, O(n) space.
