# Solutions — Compute Decimal Representation

## Digit peel from the ones place

Every base-10 component is a single nonzero digit parked at one decimal
position, so the fewest-component split of `n` simply names each nonzero
digit together with the place it sits at. Peel digits off `n` from the ones
place with division and modulo: keep a running `place` starting at one, and
while `n` is positive take `digit = n % 10`; when that digit is nonzero,
record `digit * place`, then replace `n` by its quotient and multiply
`place` by ten. The walk emits components from the smallest place value to
the largest, so reversing the collected list at the end yields the required
descending order. A number like `3000000` collapses to one component because
every peeled digit except the last reads zero.

Minimality needs no search. Adding numbers can only merge nonzero positions,
never create them: each column either keeps its sum within one digit or sends
a single carry upward, so a sum of `k` terms that each contribute exactly one
nonzero position always lands on a number with at most `k` nonzero digits.
Any valid split of `n` into base-10 components therefore needs at least as
many components as `n` has nonzero digits — and this construction uses
exactly that many, with no carries between them, which also makes it the
unique minimum decomposition.

The bound stays tiny: `n <= 10⁹` has at most ten digits, so the loop runs a
constant number of times and every component still fits a signed 32-bit
integer.

**Complexity:** `O(log n)` time, `O(1)` space.
