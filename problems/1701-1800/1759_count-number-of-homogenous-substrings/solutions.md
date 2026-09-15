# Solutions — Count Number of Homogenous Substrings

A homogenous substring lives entirely inside one maximal run of equal
characters, and a run of length `k` contributes `k * (k + 1) / 2` of
them — one for each choice of both endpoints inside the run.

## Run-length accumulation

Walk the string once carrying the current run length: it grows by one
when the character repeats the previous one and resets to one
otherwise. Adding the running length at each step charges every
position with the number of homogenous substrings ending there —
position `i` inside a run contributes exactly its distance from the
run's start — which sums to the per-run triangle totals without ever
splitting the string explicitly. The running total is kept modulo
`10^9 + 7`; the per-step addition stays below the modulus after each
reduction, so 64-bit accumulators in the fixed-width languages never
overflow.

On `"abbcccaa"` the runs are `a, bb, ccc, aa` with lengths 1, 2, 3, 2,
contributing 1 + 3 + 6 + 3 = 13. On `"zzzzz"` one run of five
contributes 15. A long single-character string at the length bound
wraps the modulus several times, which the modular accumulation
absorbs naturally.

**Complexity:** `O(n)` time, `O(1)` extra space.
