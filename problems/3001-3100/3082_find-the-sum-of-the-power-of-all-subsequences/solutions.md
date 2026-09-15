# Solutions — Find the Sum of the Power of All Subsequences

## Length-indexed knapsack weighted by superset counts

Summing the power of every subsequence directly is hopeless (2ⁿ outer
subsequences), but the sum reorganizes by the inner subsequence: a `T` with
sum `k` and length `j` is contained in exactly `2^(n-j)` subsequences — each of
the `n - j` outside elements is free to join or not — so the answer is
`sum_j count[j][k] * 2^(n-j)`, where `count[j][s]` counts length-`j`
subsequences of sum `s`.

`count` is a 0/1 knapsack over both axes: taking an element `x` shifts every
`(j-1, s-x)` entry to `(j, s)`, so the table is filled with `j` and `s` both
running descending, in place. Values above `k` are skipped outright — with all
elements positive they can never appear in a sum-`k` subsequence — which also
keeps the `s` axis bounded at `k + 1` wide. Entries are reduced modulo `10⁹ +
7` as they accumulate; the final weighting by powers of two reaches products
near `10¹⁸`, so that reduction runs in 64-bit (BigInt in JS/TS, whose Number
lane is only exact to `2⁵³`).

**Complexity:** `O(n²k)` time, `O(nk)` space.
