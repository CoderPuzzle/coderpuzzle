# Solutions — Maximum Number of Distinct Elements After Operations

Each element `v` can settle anywhere in the window `[v-k, v+k]`, and the goal
is to pick one point per window with as many distinct points as possible —
an interval-packing question, not a search over the `2k+1` shifts of each
element.

## Sort, then hand out the smallest free value

Sort the array and sweep it once, keeping `last`, the largest value handed
out so far. For the current `v` the best choice is
`max(v-k, last+1)` — the smallest value that is both fresh and no lower than
the window allows. If that candidate still fits under `v+k`, the element
contributes one more distinct value and `last` advances to it; otherwise the
window is entirely consumed by earlier picks and the element must duplicate
one of them. Starting `last` at `a[0]-k-1` makes the first element take
`v-k` naturally, with no sentinel infinity.

Why earliest-first is safe: later windows in sorted order only start further
right, so taking the smallest legal value now leaves the largest possible
room for everything that follows — any solution can be rewritten, value by
value in sorted order, to use these minimal picks without losing
distinctness. Values reach `2 × 10⁹` (numerator `10⁹ + k`), so the sweep
runs in 64-bit arithmetic where languages need it, though the answer itself
never exceeds `n ≤ 10⁵`.

**Complexity:** `O(n log n)` time for the sort, `O(n)` space (`O(1)` beyond
the sorted copy in languages that sort in place), where `n` is the length of
`nums`.
