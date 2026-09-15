# Solutions — Number of Provinces

## dfs

Provinces are exactly the connected components of the city graph, and counting components has a canonical shape: sweep the cities, and every time an unvisited city is found, a new component starts there — increment the count and traverse everything reachable from it. Each launch of the traversal discovers precisely one province, and every city is absorbed into exactly one launch, so the number of launches is the answer.

The traversal is an explicit-stack DFS, which avoids recursion-depth concerns entirely. Popping a city scans its full adjacency row `isConnected[city]`; every unvisited neighbor marked `1` is marked visited and pushed. Marking at push time rather than at pop time keeps any city from being stacked twice, so each city is popped once and each row is scanned once over the whole run — the quadratic total comes from the adjacency-matrix representation itself, where reading one city's neighbors is a linear scan.

Because `isConnected[i][i] == 1` and the matrix is symmetric, self-loops are harmless (the city is already visited) and every edge is seen from both endpoints without double counting — components are identified by visitation, not by edge tallies. Memory is the visited array plus the stack, which holds at most all cities, with no extra graph structure built.

**Complexity:** `O(n^2)` time, `O(n)` space — the stack can hold an entire province in the worst case.

## bfs

Same outer sweep, different frontier discipline: a FIFO queue. An unvisited city still starts a new province, but the flood now expands in waves — the seed is dequeued, its adjacency row scanned, and every unvisited neighbor marked and enqueued — so all cities at hop distance `d` are expanded before any at `d + 1`. The queue drains exactly when the province is exhausted, and the sweep resumes looking for the next unvisited city.

Marking happens at enqueue time rather than at dequeue time, so no city can enter the queue twice; each city is dequeued once and its row scanned once, exactly as in the DFS version. The wave order never affects the count — visitation alone decides components — so the two variants agree on every input and differ only in the order cities are explored.

**Complexity:** `O(n^2)` time, `O(n)` space — the queue can hold an entire province's frontier in the worst case.

## union_find

Instead of traversing, grow provinces by merging. Every city begins as its own province, and each road — an `isConnected[i][j] == 1` pair with `i < j` — is offered to a disjoint-set union: when the two endpoints have different roots the road genuinely joins two provinces, one root is glued under the other, and the count drops by one; when they already share a root the road is redundant and changes nothing. The matrix is symmetric, so scanning pairs `i < j` feeds every road to the union exactly once while skipping the self-diagonal.

The parent array implements the DSU with path-halving — `parent[x] = parent[parent[x]]` splices every other node on the walk directly under its grandparent, flattening the tree as it goes so repeated finds get progressively cheaper. After all pairs are consumed, the surviving count is the number of provinces, with no visited array and no traversal at all.

**Complexity:** `O(n^2 · α(n))` time — every matrix pair is inspected once and each union costs near-constant amortized time under compression — with `O(n)` space for the parent array.
