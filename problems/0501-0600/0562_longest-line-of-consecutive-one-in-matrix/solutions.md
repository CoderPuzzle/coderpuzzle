# Solutions — Longest Line of Consecutive One in Matrix

## Four run lengths per cell, one row of state

A line of ones passing through a cell arrives from exactly one of four
neighbours per direction: the left (horizontal), the cell above (vertical), the
upper-left (diagonal), or the upper-right (anti-diagonal). So a single sweep
can track, for every cell holding a 1, the length of the run of ones _ending_
at that cell in each of the four directions. A 1 extends the four runs that
arrive at it by one; a 0 resets all four to zero, because no line can pass
through it. The answer is the largest value any run ever reaches, and a matrix
of all zeros never leaves the initial 0.

Every input the recurrence needs comes from the current row or the one above
it: the horizontal run is read from the cell just written to the left, and the
vertical, diagonal, and anti-diagonal runs from the row above at columns `j`,
`j - 1`, and `j + 1`. Keeping just that previous row — `n` quadruples of four
run lengths — is therefore enough; the code builds each current row fresh from
it and swaps, so no value is ever read after being overwritten. Reads past the
left, right, or top border contribute 0, which is exactly what a run meeting
the matrix edge means, so border cells need no special case.

The `m * n <= 10⁴` ceiling keeps the sweep at ten thousand cells regardless of
how skewed the rectangle is, and the answer can never exceed `max(m, n)`, so it
sits far inside a 32-bit integer. Degenerate shapes fall out of the same
recurrence: in a single-row matrix only the horizontal run can grow past 1, in
a single-column matrix only the vertical one, and the diagonal runs top out at
`min(m, n)` even in a full matrix of ones.

**Complexity:** `O(mn)` time, `O(n)` extra space.
