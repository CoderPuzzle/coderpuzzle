# Solutions — Amount of Time for Binary Tree to Be Infected

## Parent map plus BFS from the start node

Infection spreads one edge per minute in both directions, so the minute a
node is infected equals its graph distance from the start node once
parent edges are added. Collect the tree's edges into an undirected
adjacency map with one traversal, then run a breadth-first search from the
start value: every layer peeled off is one more minute, and the deepest
layer reached is exactly the number of minutes needed to infect the whole
tree.

![On the Example 1 tree with start = 3, the BFS frontier stamps each node with its infection minute — 3 at minute 0, then 1, 10, 6; 5; 4; 9, 2 — so the deepest layer, minute 4, is the answer.](figures/solution-bfs-infection-minutes.svg)

Because node values are unique, values alone work as node identities and
no visited bookkeeping beyond a seen set is required.

**Complexity:** `O(n)` time, `O(n)` space.
