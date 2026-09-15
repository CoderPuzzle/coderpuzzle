# Solutions — Valid Permutations for DI Sequence

The DI string only ever compares neighboring values, so their magnitudes
never matter — only the relative order of what has been placed so far.
The count therefore builds position by position, deciding where each new
value ranks among those already chosen.

## Rank DP with prefix sums

Let `dp[i][j]` count the ways to fill the first `i + 1` positions, valid so
far, with the value at position `i` being the `j`-th smallest of the values
used so far. `dp[0][0] = 1`. Appending a value whose rank among the now
`i + 2` placed values is `j` shifts every older value of rank `j` or above
up by one — and that relabeling is free, since which concrete values are in
play is never fixed. The step `s[i]` then only compares ranks: an `'I'`
requires the old last value to sit below the new one, which admits exactly
the old ranks `0..j-1`, so `dp[i][j] = dp[i-1][0] + … + dp[i-1][j-1]`; a
`'D'` admits the old ranks `j` and above, the complementary sum. The
answer is `sum dp[n][*]`.

Both rules are prefix sums of the previous row: with
`P[t] = dp[i-1][0] + … + dp[i-1][t-1]`, the new row for `'I'` is `P`
itself and for `'D'` it is `P[m] - P[j]` cell by cell, so each transition
costs `O(1)` and no row but the previous is ever read — one rolling array
carries the whole table. On `"DID"`: `[1]` — `'D'` → `[1, 0]` — `'I'` →
`[0, 1, 1]` — `'D'` → `[2, 2, 1, 0]`, summing to 5, exactly the five
permutations listed in Example 1.

Exact counts pass `10⁹ + 7` long before the bound — an alternating string
of length 14 already holds 1,903,755,312 — so every cell is reduced modulo
`10⁹ + 7` as it is written; rows and prefix sums accumulate in 64-bit
integers where widths are fixed, and the reduced answer fits the 32-bit
return. At `n = 200` the nested loops touch about 20,000 cells in total.

**Complexity:** `O(n²)` time, `O(n)` space.
