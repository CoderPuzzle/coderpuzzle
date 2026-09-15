# Solutions — Factor Combinations

## Backtracking over ascending factors

The search keeps two numbers: `remaining`, the part of `n` still to break
down, and `start`, the smallest factor still allowed. It tries every factor
`f` from `start` upward while `f * f <= remaining`; whenever `f` divides
`remaining`, the pair closes one combination — `remaining / f` is at least
`f`, so both sit in `[2, n - 1]` and appending them keeps the list ascending
— and the search then recurses into `remaining / f` with `f` as the new
`start` to split the cofactor further. The `f * f <= remaining` cutoff is
what makes every multiset appear once: the closing factor is always the
largest, so no permutation of a combination is ever re-emitted, and the
trivial `n * 1` never appears because 1 is never tried. For `n = 1`, primes,
and any `n` with no divisor that far down, the loop finds nothing and the
answer is empty.

Growing combinations strictly left to right emits each length group in
lexicographic order, but interleaves the groups — `n = 12` yields `[2,6]`,
then `[2,2,3]`, then `[3,4]`. The statement pins fewest factors first, so a
final sort by `(length, lexicographic)` reassembles the display order
`[[2,6],[3,4],[2,2,3]]`. Equal-factor pairs such as `[4,4]` for `16` or
`[8,8]` for `64` need the loop bound inclusive: `f * f == remaining` is a
legal close.

Each call does `O(√n)` trial divisions, one call happens per emitted prefix,
and the recursion depth is at most `log₂ n` since every factor is at least 2.

**Complexity:** `O(√n · m)` time, `O(m · log n)` space (the output
dominates), where `m` is the number of combinations.
