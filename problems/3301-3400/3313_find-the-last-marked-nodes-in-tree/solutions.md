# Solutions — Find the Last Marked Nodes in Tree

## Tree Diameter Endpoints

The marking process is breadth-first search in disguise: each second marks
exactly the next BFS layer out from the initial node, so the last marked
nodes for a start `i` are precisely the farthest nodes from `i`. A classic
tree fact closes the gap — for every node, some diameter endpoint is a
farthest node from it — so instead of measuring all `n` eccentricities, it
suffices to know the two diameter endpoints and, for each node, which of
them lies farther away.

Both endpoints come from two BFS sweeps: start anywhere, take a farthest
node `u`, then BFS from `u` and take a farthest node `v`. The sweep from `u`
already yields the distance array `distU`; a third BFS from `v` yields
`distV`. Node `i` then takes whichever endpoint has the larger distance, and
when the two distances tie, both endpoints are marked in the same final
second, so either is a valid answer. All three traversals are iterative
level walks over an explicit queue, so no recursion touches the call stack
even at the top of the size range.

**Complexity:** `O(n)` time, `O(n)` space.
