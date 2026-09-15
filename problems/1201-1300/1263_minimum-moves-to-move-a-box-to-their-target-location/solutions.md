# Solutions — Minimum Moves to Move a Box to Their Target Location

## Box-state BFS with a player-reachability flood fill

Only pushes are counted, so the search state that matters is the box's cell
plus which side the player stands on — `(box, push_direction)` fully determines
the next box cell. For each box position, a flood fill of the free floor from
the player's current spot (treating the box as an obstacle) tells which sides
are reachable; every reachable side offers a push at cost one.

BFS over `(box_row * n + box_col) * 4 + side` therefore yields minimal pushes:
each layer expands all four candidate pushes whose standing cell is flooded,
moving the box one step and placing the player where the box was. The first
state with the box on `'T'` is optimal, because every path of k pushes appears
as a length-k chain in this graph.

**Complexity:** each flood fill is `O(m*n)` and there are `O(m*n)` box states,
so `O((m*n)^2)` time overall; visited state storage is `O(m*n)`.
