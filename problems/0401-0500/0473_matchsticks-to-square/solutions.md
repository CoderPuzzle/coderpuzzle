# Solutions — Matchsticks to Square

## Backtracking with Symmetry Pruning

Forming a square means splitting the sticks into four groups of equal length, so the first checks are pure arithmetic: if the total is not divisible by 4 there is no square, and if the longest stick exceeds the side length `total / 4` it can never fit. The solution then sorts the sticks in descending order so the large, most constrained sticks are placed first — if a placement fails, it fails after exploring only a few branches instead of a full subtree.

The search assigns stick `i` to each of the four side buckets in turn, keeping only the current length of each side (which sticks are on a side never matters). A side is tried only when the stick still fits (`sides[j] + value <= side`); the assignment is made, the recursion moves to stick `i + 1`, and the choice is undone on failure. Two prunings keep the tree tiny: a `tried` set skips later sides whose current length equals one already attempted for this stick, because filling interchangeable sides explores symmetric, equivalent states; and the descending order concentrates failures near the root.

The base case checks that all four sides equal `side`, which given that every partial sum stays at most `side` and the grand total is `4 * side` is guaranteed once every stick is placed — the check is a final safety assertion. With at most 15 sticks the worst-case tree is `4^n`, but the equal-length and capacity prunings make typical inputs finish almost instantly. Space is the recursion depth plus the four running sums and the tiny `tried` set, all linear in the number of sticks at worst.

**Complexity:** `O(4^n)` time, `O(n)` space.
