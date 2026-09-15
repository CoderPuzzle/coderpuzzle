# Solutions — Shortest Path to Get All Keys

## BFS over (Cell, Key Mask) States

A plain breadth-first search over the grid is not enough here, because whether a cell can be entered depends on which keys have already been collected: a lock blocks one visit and admits another. Since there are at most six keys, the set of held keys fits in a 6-bit mask, so the search state becomes the triple (row, column, mask). The same square may legitimately be visited up to 2^k times — once per key set — and each such visit is a distinct state.

![The route through "@.a..", "###.#", "b.A.B": two moves to key 'a', six more to 'b' through lock 'A'.](figures/solution-keys-route.svg)

A first scan of the grid locates the start `'@'` and builds a target mask with one bit per lowercase key found. The BFS then proceeds level by level: for each popped state, the four neighbors are checked for grid bounds and walls; a lock `'A'`–`'F'` is passable only if the matching key bit is set; stepping onto a key cell ORs its bit into the mask. Each state gets a distance the first time it is reached, which both marks it visited and preserves BFS's guarantee that the first arrival uses the fewest moves.

The answer is the distance of the first state whose mask equals the target — reaching the last key is itself the final move, already counted by the BFS. If the queue drains without any full-mask state appearing (for example a key sealed behind its own lock, as in `"@Aa"`), the function returns -1. Walls, borders, and re-entering a cell under a richer mask are all handled by the state-based visited check.

**Complexity:** `O(m·n·2^k)` time, `O(m·n·2^k)` space.
