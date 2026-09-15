# Solutions — Kth Smallest Instructions

## Greedy construction with binomial counting

Since `'H'` sorts before `'V'`, the lexicographically smallest valid
string is decided character by character: at each position, prefer
`'H'` if doing so still leaves at least `k` completions reachable, and
fall back to `'V'` otherwise. The number of completions that start with
`'H'` is exactly the number of ways to arrange the remaining H's and
V's after using one H — a binomial coefficient. If `remaining_h` H's
and `remaining_v` V's are still owed, committing to `'H'` leaves
`remaining_h - 1` H's and `remaining_v` V's to place in the rest of
the string, in any order, so that count is `C(remaining_h - 1 +
remaining_v, remaining_v)`.

At each step: if `remaining_h` is `0` the only legal move is `'V'`, and
symmetrically for `remaining_v`; otherwise compare `k` against
`count_if_h`. When `k <= count_if_h`, `'H'` is affordable and gets
appended. Otherwise every `'H'`-prefixed completion is skipped over by
subtracting `count_if_h` from `k`, and `'V'` is appended instead — the
same logic used to find the k-th element of a sorted list grouped by
first character. All the binomial coefficients needed (up to `C(row +
column, ·)`) are precomputed once via Pascal's triangle so no step
recomputes a factorial or risks overflow.

**Complexity:** `O((row + column)^2)` time, `O((row + column)^2)`
space.
