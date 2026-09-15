# Solutions — Find Minimum Diameter After Merging Two Trees

## Tree Diameters and Centers

Call the two diameters `d1` and `d2`. Whatever nodes an added edge picks,
the merged tree's longest path is one of three things: a longest path that
stayed inside tree 1 (`d1`), one that stayed inside tree 2 (`d2`), or a
path that crosses the new edge — which is the deepest walk away from the
attachment node `a` inside tree 1, plus the same for `b` in tree 2, plus
the single connecting edge. The first two terms are fixed; minimizing the
merged diameter therefore means minimizing the crossing term.

In a tree, the smallest over all nodes of the farthest-distance from that
node is the radius, and a tree's radius is exactly `ceil(d / 2)` — the
middle of a longest path beats every other attachment point. So the
optimal connection joins the two centers, giving
`max(d1, d2, ceil(d1/2) + ceil(d2/2) + 1)`. Example 2 confirms it: both
trees there are the same shape with diameter 4, and `2 + 2 + 1 = 5`
matches the expected output, dominating either diameter alone.

Each diameter is found with the classic two-sweep bound: BFS from any node
to find a farthest node `u`, BFS from `u` to find the farthest distance.
Both sweeps are strictly iterative queue walks — with up to `10⁵` nodes a
recursive depth-first walk could overflow the call stack, while the BFS
queues stay flat and linear.

**Complexity:** `O(n + m)` time, `O(n + m)` space.
