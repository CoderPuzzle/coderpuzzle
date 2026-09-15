# Solutions — Construct the Minimum Bitwise Array II

## Trailing-Ones Bit Construction

The impossibility case has a one-line shape: `a OR (a + 1)` always ends in a
set low bit (`a + 1` flips the trailing zero-run of `a` up, and OR-ing `a`
back in keeps at least that final 1), so the value is always odd — among
primes only 2 fails, and every other entry admits candidates.

For odd `x`, every valid `a` is `x` with exactly one bit of its trailing run
of 1s cleared. The cleared bit's lower neighbors are still set in `a`, so
`a + 1` carries precisely onto it, and the OR rebuilds `x`; bits above the
run never move. Clearing the highest bit of the run therefore gives the
smallest candidate, and since `x + 1` zeros the entire run, that bit is half
the lowest set bit of `x + 1` — one AND, one shift, one subtract, no search.
This matters at this version's bounds: with `nums[i]` up to 10⁹ an
ascending scan over candidates is out of the question, while the closed
form is a handful of operations per entry.

All intermediate values stay below 2³¹, so 32-bit integers are safe in
every language.

**Complexity:** `O(n)` time, `O(1)` extra space (beyond the output array).
