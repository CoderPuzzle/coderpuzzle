# Solutions — Manhattan Distances of All Arrangements of Pieces

Summing over arrangements directly is hopeless — there are C(m·n, k) of them —
but both the arrangement count and the Manhattan distance decompose into
independent, countable pieces, so the whole total collapses to one product.

## Linearity over cell pairs

Fix an unordered pair of distinct cells. The arrangements in which both carry
a piece are exactly the placements of the remaining `k - 2` pieces on the other
`m·n - 2` cells, so that pair contributes its distance in precisely
`C(m·n - 2, k - 2)` arrangements — the same factor for every pair. The answer
is therefore `S · C(m·n - 2, k - 2)`, where `S` is the sum of Manhattan
distances over all cell pairs of the empty board. And `S` splits by axis,
because `|x1 - x2| + |y1 - y2|` separates: two rows `d` apart form `d·(m - d)`
row pairs, each pairing any of the `n` columns on one side with any of the `n`
on the other, so rows contribute `n² · Σ d(m-d)` for `d = 1..m-1`, columns
contribute `m² · Σ d(n-d)`, and `Σ_{d=1}^{M-1} d(M-d) = M(M-1)(M+1)/6` —
three consecutive integers, so the division by 6 is exact. On the 2×2 board
`S = 4 + 4 = 8` with `C(2, 0) = 1`, and on 1×4 with `k = 3`, `S = 10` with
`C(2, 1) = 2`, reproducing both examples.

The binomial comes from factorial and inverse-factorial tables mod `10⁹ + 7`
built up to `m·n ≤ 10⁵`, with the one inverse taken by fast exponentiation.
Ranges: `M³ ≤ 10^15` and each residue product stays below `~10^18`, inside
64-bit integers everywhere the closed form runs (`n·n` alone would overflow
32 bits, so it widens first). The product of two mod-reduced residues reaches
`(10⁹ + 6)²`, past the double's exact `2^53` range, so the JavaScript and
TypeScript versions run their residue arithmetic on `BigInt` and convert back
only after the final reduction.

**Complexity:** `O(m * n)` time, `O(m * n)` space.
