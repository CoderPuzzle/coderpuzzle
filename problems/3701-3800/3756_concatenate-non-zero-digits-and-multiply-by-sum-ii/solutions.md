# Solutions — Concatenate Non-Zero Digits and Multiply by Sum II

Each query asks for a substring's non-zero digits compressed into one number
`x`, times the sum of those digits, modulo `10⁹ + 7`. Rebuilding `x` from
scratch for every query is quadratic in the worst case, so the answer is
precomputed with prefix structures over the digits.

## Prefix values over the compressed digit sequence

Think of the non-zero digits of `s` as a single compressed sequence. Three
prefix arrays over `s` record everything a range query needs: `prefVal[i]` is
the number (mod `M`) formed by concatenating the non-zero digits in `s[0..i)`,
`prefSum[i]` is their digit sum, and `prefCnt[i]` is their count. Zero digits
are skipped entirely for the concatenation, while for the digit sum they
contribute nothing — so `prefSum` is just the ordinary prefix sum of digit
values.

A query `[l, r]` maps to the slice of the compressed sequence from index
`prefCnt[l]` to `prefCnt[r + 1]`, say `k` digits long. The value of the
whole prefix `prefVal[r + 1]` is `prefVal[l]` shifted left by `k` decimal
places and then the substring's `x` appended, so
`x = prefVal[r + 1] - prefVal[l] * 10^k (mod M)`, with a precomputed power of
ten. The digit sum is a plain prefix difference, and the query's answer is
`x * sum mod M`. When the range holds no non-zero digits the slice is empty,
`x` becomes zero, and the formula returns `0` naturally.

All arithmetic is modular except the digit sum, which never exceeds
`9 · 10⁵`; only the `prefVal · 10^k` product reaches ~`10¹⁸`, comfortably
inside 64-bit integers. The JavaScript/TypeScript versions split that one
multiplication into 15-bit halves so every intermediate stays below `2⁵³`.

**Complexity:** `O(m + q)` time, `O(m)` space, where `m` is the string length
and `q` the number of queries.
