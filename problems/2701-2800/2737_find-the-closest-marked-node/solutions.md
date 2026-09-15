# Solutions — Find the Closest Marked Node

## Dijkstra from the source

Build adjacency lists from `edges`, keeping each edge directed exactly as given — an entry `u -> v` with weight `w`, never its reverse. Run Dijkstra from `s` with a binary min-heap keyed on tentative distance: pop the closest unfinalized node and relax its outgoing edges. All weights are positive, so every popped distance is final when it leaves the heap; a popped entry whose stored distance no longer matches the table is a stale duplicate and is skipped.

The answer is then just the smallest finalized distance among the marked nodes. A marked node that was never reached keeps its infinity sentinel; if every marked node is unreachable the minimum stays at infinity and the method returns `-1`. Parallel edges need no special handling — both copies sit in the adjacency list and relaxation naturally keeps the cheaper one. Distances are accumulated in 64-bit integers as a matter of hygiene: with the stated bounds a shortest path uses at most `n - 1 = 499` edges of weight at most `10⁶`, so true answers fit in 32 bits, but nothing weaker than 64-bit accumulation is worth relying on across languages.

**Complexity:** `O((n + m) log n)` time, `O(n + m)` space.
