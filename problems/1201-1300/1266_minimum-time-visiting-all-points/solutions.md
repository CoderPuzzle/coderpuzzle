# Solutions — Minimum Time Visiting All Points

## Chebyshev distance per leg, summed

Between two consecutive points, every second of travel can close at most
one unit of horizontal gap and one unit of vertical gap at once (the
diagonal move), so no strategy beats `max(|dx|, |dy|)` seconds. That bound
is achievable: move diagonally while both gaps are open — each diagonal
step shrinks both by one — then straight along the remaining single axis.
The per-leg minimum time is therefore the **Chebyshev distance** between
the endpoints, and since legs are independent (order is fixed, passing
through later points costs nothing), the answer is the sum of the
`n - 1` leg distances.

**Complexity:** `O(n)` time, `O(1)` space.
