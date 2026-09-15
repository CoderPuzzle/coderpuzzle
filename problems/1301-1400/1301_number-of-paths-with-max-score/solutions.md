# Solutions — Number of Paths with Max Score

## Dynamic programming over the board, bottom-up

Walking from the bottom-right `'S'` to the top-left `'E'`, every move goes up, left, or up-left, so each step strictly decreases `i + j` and the board is a directed acyclic graph. That gives the problem clean optimal substructure: the best sum reachable at a square is the best of the best sums reachable at the three squares it could have come from (below, right, below-right) plus the square's own digit, and the number of max-scoring paths is the sum of the counts of exactly the predecessors that attain that best.

The code sweeps the grid from bottom-right to top-left, keeping two tables. `score` holds the best sum reaching each square — or -1 when the square is unreachable, which is how obstacles and the "no path" outcome are represented — and `ways` holds the number of paths that realize that best, reduced modulo 10^9 + 7 at every addition so the tally never approaches overflow. The start square is seeded with score 0 and a single path; every other square aggregates only from predecessors the sweep has already resolved.

Every cell is visited once and consults at most three predecessors, so the work is linear in the number of squares, and the two tables are the only auxiliary storage.

**Complexity:** `O(n²)` time, `O(n²)` space for an `n × n` board.
