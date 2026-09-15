# Solutions — Smallest Absent Positive Greater Than Average

## Set membership scan above the average

Two facts make this direct. First, "strictly greater than the average" only
picks a starting point on the integer line; second, whether a candidate
qualifies after that is pure membership in `nums`. So put `nums` into a hash
set once, then walk candidates upward until one is absent.

The starting point is found without ever dividing into a float: candidate
`c` exceeds the average exactly when `c * n > total`, which is
`c > total / n` multiplied through by `n`. That integer comparison stays
exact in every language and correctly rejects a candidate equal to an
integral average, since equality fails the strict test. Walking `c` up from
1 until `c * n > total` therefore lands on the least eligible integer — 1
itself whenever negatives pull the average below 1, otherwise
`floor(avg) + 1`.

From there the set takes over: increment until the candidate is absent.
That second walk is short. Among any `k` distinct positive integers one of
`1 .. k + 1` must be missing, and at most `n` values are occupied, so at
most `n + 1` lookups happen after the skip loop — a single pass over the
input plus a bounded upward scan in all.

**Complexity:** `O(n)` time, `O(n)` space.
