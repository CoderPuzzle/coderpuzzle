# Solutions — Knight Dialer

A dialed number is nothing but the sequence of cells the knight lands on, so
counting numbers of length `n` is counting knight walks of `n - 1` hops — and
a walk is pinned down, for counting purposes, by its current cell alone,
which multiplies one ten-cell count vector out to the whole answer.

## Dynamic program over the ten cells

Let `counts[d]` be the number of distinct numbers of the current length that
end on digit `d`. Every numeric cell seeds one number of length 1, so the
row starts as ten 1s. One more hop extends every number ending on `d` to one
number per knight-neighbor of `d` on the pad — `0 → 4, 6`, `1 → 6, 8`,
`2 → 7, 9`, `3 → 4, 8`, `4 → 0, 3, 9`, `6 → 0, 1, 7`, `7 → 2, 6`,
`8 → 1, 3`, `9 → 2, 4`, and `5` nowhere — so each pass rebuilds the row as
`next[e]` receiving `counts[d]` from every `d` whose hop list contains `e`,
and `n - 1` passes grow the numbers to length `n`; the answer is the row
sum. Cell 5 is the one trap: it has no knight-neighbor, so it contributes
the single number `5` at `n = 1` and nothing longer.

Every cell holds a residue below the modulus and each write adds two of
them, so intermediates stay below `2 · 10^9`: beyond 32-bit, far inside the
64-bit accumulation of the fixed-width solutions, reduced modulo `10^9 + 7`
at every write. Python's integers are unbounded, and the JavaScript and
TypeScript sums stay exact far below `2^53`. At the bound `n = 5000` the
fill is `5 · 10^4` cell writes.

**Complexity:** `O(n)` time, `O(1)` space (10 cells).
