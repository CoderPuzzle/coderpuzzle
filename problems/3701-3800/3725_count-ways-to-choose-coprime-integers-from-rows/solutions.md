# Solutions — Count Ways to Choose Coprime Integers from Rows

## Mobius inversion over divisor products

Counting selections by their exact gcd means tracking a whole profile of
reachable gcd values row by row. Inverting the question is cheaper: for each
d let f(d) be the number of selections in which every picked integer is
divisible by d — selections whose overall gcd is any multiple of d. The rows
constrain picks independently, so f(d) factors into a product over rows,
each factor just the count of multiples of d in that row. A frequency table
per row turns those counts into one harmonic sweep over multiples, so every
f(d) falls out without enumerating a single selection: at most `V log V`
count additions per row, with V bounding the cell values.

f(d) still over-counts the gcd-1 target: f(1) counts every selection, and
selections whose overall gcd is 2, 3, or any other divisor sit inside it.
Mobius inversion unwinds exactly that nesting — the number of selections
with overall gcd 1 equals `sum(mu(d) * f(d))` over d >= 1, where mu is the
square-free sign function (mu(1) = 1, mu(d) = 0 when d carries a squared
prime, the sign flipping with each additional prime). The sieve needs no
factorizations: seeding mu[1] = 1 and subtracting mu[i] from every proper
multiple of i evaluates the identity "the sum of mu over the divisors of j
is 1 exactly for j = 1" in place. The identity settles the degenerate shapes
for free too — rows whose entries all share a factor k > 1 contribute
`(sum of mu over divisors of k)` times a constant product, which vanishes,
so an all-twos board answers 0, while a row holding nothing but 1s zeroes
every f(d) with d > 1 and leaves the full product of row lengths.

The numeric shape stays narrow. Each product step multiplies one reduced
residue below `10^9 + 7` by a row count of at most n <= 150 before reducing
again, so fixed-width ports never leave 64-bit range and the JavaScript
doubles stay far below `2^53`; the final signed total is bounded by
`V * (10^9 + 7)` with V <= 150, and the C-family ports renormalize that one
possibly-negative `%` on the way out.

**Complexity:** `O(m * n + m * V * log V)` time, `O(V)` space.
