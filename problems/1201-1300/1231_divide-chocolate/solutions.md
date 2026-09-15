# Solutions — Divide Chocolate

## Binary Search on the Answer with Greedy Check

The key insight is to invert the question: instead of searching over cut positions, search over the answer `t` — "can the bar be cut into at least `k + 1` pieces, each of total sweetness at least `t`?" This predicate is monotone: if every piece can reach sweetness `t`, it can also reach any smaller threshold, so the answer is the largest `t` for which the predicate holds. The search range is bounded above by `sum // (k + 1)`, since the average piece cannot exceed the total divided among `k + 1` pieces, and below by 1 because every chunk is positive.

The predicate is checked greedily in one pass: sweep the chunks accumulating a running sum, and cut as soon as the sum reaches `t`. Cutting at the earliest legal opportunity is optimal — delaying a cut only moves sweetness into an earlier piece that is already satisfied, and leaves less material for the remaining pieces. If this greedy yields at least `k + 1` pieces, the bar can certainly be divided into exactly `k + 1` pieces of sweetness at least `t` (merging adjacent surplus pieces only raises their sums); if it yields fewer, no cutting achieves threshold `t`.

The binary search keeps the largest feasible `t` seen in `best` and halves the range each step, converging on the maximum minimum-piece sweetness. Writing `n` for the chunk count and `S` for the total sweetness, each feasibility check is one linear pass and the number of checks is logarithmic in `S`. The upper bound makes the range tight, and positive chunk values guarantee the greedy never produces an empty piece. The final `best` is a sum of whole chunks because every candidate `mid` is validated by an actual greedy cut pattern.

**Complexity:** `O(n log S)` time, `O(1)` space.
