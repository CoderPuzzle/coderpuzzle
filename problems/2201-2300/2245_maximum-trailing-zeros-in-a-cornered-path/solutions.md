# Solutions — Maximum Trailing Zeros in a Cornered Path

## Prime exponent prefix sums around each elbow

Trailing zeros of a product equal `min(v2, v5)` — the total exponents of 2 and of 5 in its prime factorization — so the actual products (astronomically large) never need to be formed. Each cell is decomposed once by repeated division into `count2` and `count5`, and from there the problem is purely additive. A cornered path is an L-shape: a horizontal ray and a vertical ray meeting at an elbow cell, so it suffices to treat every cell as a potential elbow and combine the four arm pairings (left/right × up/down).

To get any arm's exponent sum in constant time, the code builds four prefix-sum tables: running sums of `count2` and `count5` along each row (prefix per row, so any horizontal segment is a subtraction) and the same along each column. For an elbow at `(r, c)`, each candidate path takes one horizontal segment and one vertical segment, each of which _includes_ the elbow, so the elbow's exponents are subtracted once from the combined total — the `- cell2` / `- cell5` corrections. Straight paths and even the single-cell path need no special casing: an "arm" is allowed to degenerate to just the elbow, which recovers them as the degenerate L.

The answer is the maximum over all cells of the best of the four pairings, floored at 0 for grids whose products never contain both a 2 and a 5. Factorization, prefix tables, and the final double loop are each a constant amount of work per cell, and the six tables are all `O(mn)`.

**Complexity:** `O(mn)` time, `O(mn)` space.
