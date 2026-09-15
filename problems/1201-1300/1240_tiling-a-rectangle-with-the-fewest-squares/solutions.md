# Solutions — Tiling a Rectangle with the Fewest Squares

## Backtracking on the lowest empty cell, pruned by the best so far

Scan for the topmost-then-leftmost cell still uncovered and try placing a
square of every legal side there — largest first, since fewer big squares is
the direction the optimum lies in. Each placement paints its cells, the
recursion fills the next hole, and on return the paint is undone. A count
that reaches or passes the best found so far is abandoned immediately; that
bound is what keeps the search inside the time limit at 13x13.

Two further cuts matter. Trying side lengths in decreasing order finds a
good incumbent early, tightening the pruning from the first descent. And when
the remaining uncovered area cannot possibly beat the incumbent — the count
times the largest square area already exceeds what is left — the branch dies
without another placement.

Recursion depth is bounded by the incumbent (never more than `n * m` singles,
and in practice far less), well within every judged stack.

**Complexity:** exponential in the worst case but heavily pruned; `O(n * m)`
space for the board and the recursion.
