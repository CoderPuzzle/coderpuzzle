# Solutions — Egg Drop With 2 Eggs and N Floors

## Incremental coverage with triangular numbers

Think backwards from the move budget instead of forwards from the floors: let `cover(m)` be the tallest building solvable with `m` moves and 2 eggs. The first drop of an optimal strategy should be made at floor `cover(m-1) + m`. If the egg breaks, 1 egg and `m - 1` moves remain, which exactly suffices to linear-scan the `m - 1` floors below. If it survives, the full `m - 1` moves and both eggs remain for the floors above, covering `cover(m-1)` more. Summing gives `cover(m) = cover(m-1) + m`, and unrolling yields the triangular number `m(m+1)/2`.

The answer is the smallest `m` whose coverage reaches `n`, and the code computes it by pure accumulation: it keeps adding `1, 2, 3, ...` to a running total, counting one move per addition, and stops the first time the total reaches `n`. No formula, square root, or binary search is required — since the total passes `n` after about `sqrt(2n)` steps, the loop is tiny even for the maximum `n` of 10,000 (142 moves).

Correctness of the exchange argument is the crux: dropping the first egg any lower wastes moves above (the second egg would rescan floors the first egg could have skipped), and dropping it any higher risks more floors below than the single remaining egg can scan with the moves left. The triangular schedule balances both branches to exactly `m` total moves in every outcome.

**Complexity:** `O(sqrt(n))` time, `O(1)` space.
