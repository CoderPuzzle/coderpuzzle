# Solutions — Minimum Cost Path with Edge Reversals

## Dijkstra over forward and doubled reverse edges

A reversal is fully described by the edge it acts on: standing at node `v`,
flipping the switch on an incoming edge `u -> v` produces exactly one move,
`v -> u`, priced `2 * w`. So every input edge `(u, v, w)` contributes a second
arc `(v, u, 2 * w)` to the search graph, and traversing that arc _is_ the
reversal — no per-node switch bookkeeping is needed. The omission is justified
by the weights: every arc costs at least 1, so an optimal trip never revisits
a node, enters each node exactly once, and can therefore flip at most one
switch per node even though the encoding would allow more. What the rules
forbid, the optimality of simple paths never wants.

Run Dijkstra from node `0` over this augmented graph and read off the distance
of node `n - 1`. All arc weights are positive, so every heap pop finalizes its
node; a popped entry whose stored distance no longer matches the table is a
stale duplicate and is skipped. Parallel edges and self-loops need no special
handling — both copies of a parallel pair sit in the adjacency list and
relaxation keeps the cheaper one, while a self-loop's forward and reversed
arcs lead back to their own node and never improve anything. An unreached
target keeps its infinity sentinel and the answer is `-1`.

Distances accumulate in 64-bit integers across the fixed-width languages. The
bounds say a simple path has at most `n - 1` arcs of weight at most
`2 * 1000`, so true answers stay below `10⁸` and would fit in 32 bits — the
wider accumulator is free insurance and makes the sentinel arithmetic
cleaner.

**Complexity:** `O((n + m) log n)` time, `O(n + m)` space.
