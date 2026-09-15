# Solutions — Kth Smallest Number in Multiplication Table

## Binary Search on the Answer

The table has up to 9 * 10^8 cells, so materializing it is out of the question — but its values are so orderly that counting is cheap. The function `count_at_most(x)` returns whether at least `k` table entries are `<= x`, computing the exact count row by row: row `i` contains the multiples `i, 2i, ..., ni`, of which at most `x // i` do not exceed `x`, capped at `n`. The count is monotone in `x`, which makes it a valid binary-search predicate over the value range `[1, m * n]`.

The search finds the smallest `x` whose count reaches `k`. That smallest `x` is guaranteed to be an actual table entry: if it were not, no cell equals it, so `count_at_most(x)` would equal `count_at_most(x - 1)` and the smaller value would satisfy the predicate too, contradicting minimality. Hence the converged value is the kth smallest element itself, not merely a nearby number.

Each predicate evaluation loops over the `m` rows with an early exit as soon as the running total reaches `k`, keeping it fast even when the binary search probes large values. Only a handful of integer variables are used — the table is never allocated.

With `m` rows scanned per probe and about `log2(m * n)` probes, the cost is independent of `n`'s contribution except through the search range.

**Complexity:** `O(m log(mn))` time, `O(1)` space.
