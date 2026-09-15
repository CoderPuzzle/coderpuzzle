# Solutions — Minimum Number of Moves to Seat Everyone

## Sort and pair equal ranks

Sort the seat positions and student positions independently, then pair the
smallest student position with the smallest seat position, the next smallest
with the next smallest, and so on. Add the absolute distance of every pair.

If two assignments cross, swapping their destinations cannot increase their
total distance on a line. Repeatedly uncrossing assignments therefore yields
the rank-by-rank pairing, proving that its distance sum is minimal. Duplicate
starting positions remain separate entries and are handled naturally.

**Complexity:** `O(n log n)` time, `O(n)` auxiliary space in the worst case.
