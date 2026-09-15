# Solutions — Domino and Tromino Tiling

## Linear DP with the f(n) = 2f(n-1) + f(n-3) recurrence

Track two states per column boundary: `f(i)`, the number of ways to fully tile the first `i` columns, and `p(i)`, the number of ways to tile them leaving exactly one cell of column `i+1` already covered (a tromino poking out; top-poking and bottom-poking are symmetric and share the count). The transitions read off the tile shapes: a fully tiled column `i` comes from a vertical domino (`f(i-1)`), two stacked horizontal dominoes (`f(i-2)`), or capping either stick-out shape with a tromino (`2 * p(i-1)`); a stick-out at `i` continues a previous stick-out with a horizontal domino (`p(i-1)`) or adds a tromino to a fully tiled `i-1` columns (`f(i-2)`).

Eliminating `p` from this pair of recurrences collapses everything into a single relation on full tilings: `f(n) = 2*f(n-1) + f(n-3)`. That is the recurrence the solution runs: three rolling values seeded with `f(0) = 1`, `f(1) = 1`, `f(2) = 2`, each step replacing them with `(f(n-2), f(n-1), 2*f(n-1) + f(n-3))`, all modulo `10^9 + 7` to keep numbers bounded.

The base cases `n = 1` and `n = 2` are returned directly (1 way and 2 ways respectively), and the loop runs only from 3 upward, so the seed values are never misapplied. Linearity of the recurrence means one pass of constant work per column suffices, with no need to materialize the intermediate stick-out table.

![The five tilings of the 2 x 3 board: three domino-only arrangements and the two mirrored tromino pairs.](figures/solution-tilings.svg)

**Complexity:** `O(n)` time, `O(1)` space (three rolling values).
