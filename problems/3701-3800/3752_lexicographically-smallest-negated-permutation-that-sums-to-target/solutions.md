# Solutions — Lexicographically Smallest Negated Permutation that Sums to Target

## Greedy negation of the largest values

Every candidate array is the all-positive baseline `[1, 2, ..., n]` with some
subset of its values negated. Negating `x` moves the sum from `S = n * (n +

1. / 2`down by exactly`2 * x`, so a target is reachable if and only if it
lies in `[-S, S]`and shares the parity of`S`— outside that window no
assignment of signs can land there, and an odd gap means every reachable sum
misses it by a multiple of 2. When either check fails the answer is the
empty array. Otherwise the required deficit`D = (S - target) / 2`names
exactly what the negated subset must sum to: choose any subset of`{1, ..., n}`whose values add up to`D`, negate precisely those values,
and the sum drops by `2 * D`, landing on `target`.

The signs are forced once `D` is fixed; only the arrangement stays free, and
arrangement is all lexicographic order reads. A negative element is smaller
than any positive one, so the smallest array pushes every negated value to
the front, largest magnitude first — descending among themselves — because
at the first position where two front-loaded candidates differ, the one with
the bigger (more negative) lead wins. The remaining positives then read in
ascending order, the smallest tail any fixed multiset allows. So the answer
is `[negated values descending] + [kept values ascending]`.

One greedy pass builds both at once. Scan `x` from `n` down to `1`: negate
`x` whenever `x <= D` and subtract it from `D`. Taking the largest value
first whenever it fits is safe: if the scan ever leaves `D >= x` unspent at
the moment value `x` is passed, swapping a smaller taken element `y < x`
for `x` (possible because the values below `x` sum to at least `x`) keeps
the subset sum unchanged while moving mass to a larger value, so no
larger-first choice can block completion. The scan therefore always ends
with `D = 0`, and emitting the negated values in the order they were taken
— descending — followed by the kept positives ascending is the answer.

**Complexity:** `O(n)` time, `O(n)` space.
