# Solutions — Count Number of Ways to Place Houses

## Fibonacci line per side, squared

A full arrangement is one independent choice per side: adjacency only ever
constrains plots on the same side of the street, which is exactly what the
statement's Note grants. Pair any valid left line L with any valid right line
R and each pair is a distinct arrangement; every arrangement splits back into
its own two lines. The answer is therefore `f(n) * f(n)`, where `f(n)` counts
house placements along one side alone. Example 1 shows the factorization
concretely: with `n = 1` each side freely picks from {empty, house}, producing
the four listed arrangements as `2 * 2 = 4`.

For one line, split on the last plot. An empty plot n leaves the first n - 1
plots carrying any valid placement: `f(n - 1)` ways. A house on plot n forces
plot n - 1 empty and leaves only the first n - 2 plots constrained: `f(n - 2)`
ways. So `f(n) = f(n - 1) + f(n - 2)` with `f(0) = 1`, `f(1) = 2` — the
Fibonacci sequence. Example 2 agrees: `f(2) = 3`, and `3 * 3 = 9`.

One pass keeps the last two values reduced modulo `10⁹ + 7` and squares once
at the end. Every loop sum stays below `2³¹`, but the final square reaches
about `10¹⁸`, past the `2⁵³` exact-integer limit of JavaScript doubles — so
the JS and TS versions square through BigInt, while the typed languages
multiply in 64-bit integers, where any product of two sub-`2³⁰` residues fits.

**Complexity:** `O(n)` time, `O(1)` space.
