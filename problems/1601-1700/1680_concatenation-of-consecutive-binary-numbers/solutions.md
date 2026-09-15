# Solutions — Concatenation of Consecutive Binary Numbers

The concatenated string itself is the obstacle: at `n = 10⁵` it runs to
1,568,946 bits — a number whose decimal form would carry hundreds of
thousands of digits. But appending a binary numeral to another is exactly a
shift — the value so far doubles once per appended bit — and the modulus can
ride along at every step, so the whole walk stays inside a machine word.

## Append by shifting, keep the residue

Appending the `L`-bit binary form of `i` to a value `v` computes
`v * 2^L + i`: each appended bit shifts the existing digits one place left,
and the appended number lands in the cleared low bits. So one pass over
`i = 1..n` carries the entire concatenation as a running residue — after
each append, reduce modulo `10⁹ + 7`. `L` is simply the bit length of `i`,
and it never has to be recomputed: it starts at `1` for `i = 1` and
increments exactly when `i` is a power of two — tested by
`i & (i - 1) == 0` — because only a newly set highest bit widens a binary
numeral; between powers of two, every `i` shares one width.

Reducing at every step is legal because residue arithmetic composes with
`+` and `*`: the residue of the full concatenation equals the residue of
the same computation with intermediate reductions. And every intermediate
is small — the residue stays below `2^30` and `L` never exceeds `17` at
`n <= 10⁵`, so `result * 2^L + i` stays below `2^48`. That leaves the
fixed-width implementations computing in 64-bit registers with room to
spare, keeps JavaScript's doubles inside their `2^53`-exact integer range,
and lets Python's plain integers skip the question entirely. Example 3 is
the walk in miniature: twelve appends produce the 39-bit string worth
`118505380540`, which reduces to `505379714`.

Each iteration spends one AND, one shift, one add, and one reduction — `n`
iterations decide the whole answer, and nothing is stored beyond the
residue and the width.

**Complexity:** `O(n)` time, `O(1)` space.
