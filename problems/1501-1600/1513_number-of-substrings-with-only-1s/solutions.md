# Solutions — Number of Substrings With Only 1s

## Sum over maximal runs of 1s

Every substring of only `'1'` characters lies entirely inside one maximal
run of consecutive `'1'`s, so the answer decomposes into an independent
contribution from each run. A run of length `n` has exactly `n` substrings
of length 1, `n - 1` of length 2, and so on down to one substring of
length `n`, for a total of `1 + 2 + ... + n = n * (n + 1) / 2` all-1s
substrings.

The algorithm scans `s` once, tracking the length of the run of 1s ending
at the current position: it resets to 0 on a `'0'` and increments on a
`'1'`. Adding the current run length to a running total after each step
accumulates exactly `n * (n + 1) / 2` for every completed run, since a run
of length `n` passes through run-lengths `1, 2, ..., n` one character at a
time. The running total is reduced modulo `10⁹ + 7` at each step (or kept
in a 64-bit accumulator and reduced once at the end) to avoid overflow,
since a single run can be as long as the whole string.

**Complexity:** `O(n)` time, `O(1)` space.
