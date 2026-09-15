# Solutions — Determine Color of a Chessboard Square

A chessboard coordinate is two characters that fix a square's color the
moment they are read: the color depends only on the parities of the file
and the rank.

## File and rank parity

The crawl's own examples pin the anchor: `a1` is black. Every step along
a file or a rank moves to the neighboring square, which always has the
opposite color — so the color is decided by the parity of
`file + rank`: odd sums are white, even sums are black. `a1` is
`1 + 1`, even, black; `h3` is `8 + 3`, odd, white; `c7` is `3 + 7`,
even, black again. The check reads the two characters straight out of
`coordinates` (`'a'` maps to file 1 through `'h'` as file 8), sums, and
takes the parity — nothing else.

The constraints close the domain completely: `coordinates.length == 2`
with `'a'..'h'` first and `'1'..'8'` second means exactly 64 legal
inputs, and the hidden corpus sweeps all of them — every square, corner
to corner, 32 white and 32 black. Two character reads and one parity
test; no recursion, and no value ever exceeds 16, so every language runs
exact small integers.

**Complexity:** `O(1)` time, `O(1)` space.
