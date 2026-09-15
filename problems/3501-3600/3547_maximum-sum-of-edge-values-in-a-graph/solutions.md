# Solutions — Maximum Sum of Edge Values in a Graph

## Pendulum placement on the path or cycle

A connected graph where every node touches at most 2 others is one piece:
either a simple path (m = n - 1 edges, two degree-1 ends) or a simple cycle
(m = n edges, every degree 2). All n values must be used exactly once, so
only the placement matters — and on a path or cycle each placement's score
is just a sum of adjacent-pair products along a single line of nodes.

The greedy placement "pendulums" the values: 1, 3, 5, … ascending odds
followed by …, 6, 4, 2 descending evens. Each interior value then sits
between the two neighbours nearest in size, the largest values land
side-by-side where the products are biggest, and the two smallest values
absorb the weakest adjacencies at the path's ends (on a cycle the closing
edge joins 2 back to 1). Summing the products of consecutive entries of
that sequence — plus `seq[0] * seq[-1]` when the edge count says cycle —
yields the maximum score; the edge list itself only decides path vs cycle
via m = n - 1 vs m = n.

The score is a sum of at most n products, each at most n² ≈ 2.5×10⁹, so
the total is bounded by n³ ≈ 1.25×10¹⁴ — far past 32 bits, hence 64-bit
accumulators (still comfortably below 2⁵³, so JavaScript numbers stay
exact). Runtime is a single O(n) pass over the value sequence with O(n)
space; edges are only counted, never traversed.

**Complexity:** `O(n)` time, `O(n)` space.
