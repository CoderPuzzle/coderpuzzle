# Solutions — Minimum Cost Walk in Weighted Graph

## Union-find with a per-component AND

A walk may repeat edges, and AND-ing in more weights can only lower the cost, so the cheapest walk between two connected vertices uses every edge of their component: after collecting the whole component (each edge traversed out and back costs nothing extra to include), any final path to the target only re-ANDs weights already accounted for. Hence the minimum cost between connected vertices is the AND of all edge weights in their shared component, and if no walk exists the answer is -1.

Group vertices with union-find (path halving plus union by size, so finds run in near-constant time), then make a second pass over the edges AND-ing each weight into an accumulator keyed by its component root. Vertices with no edges keep their trivial component with no accumulator entry — but such a vertex is only ever queried against a different root, so the missing entry never surfaces as an answer.

![Union-find merges {0,1,2,3} under root 0 while the edge weights 7, 7, 1 AND the root accumulator down to 1, so query [0,3] costs 1 and edgeless node 4 leaves query [3,4] at -1.](figures/solution-union-find-component-and.svg)

Each query is then two `find` calls: different roots yield -1, the same root yields the component's AND, which is 0 as soon as any edge of the component has a zero bit anywhere (in particular for weight-0 edges).

**Complexity:** `O((n + E + Q) * alpha(n))` time, `O(n)` space.
