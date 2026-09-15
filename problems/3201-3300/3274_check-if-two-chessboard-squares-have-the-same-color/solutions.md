# Solutions — Check if Two Chessboard Squares Have the Same Color

A chessboard's colors alternate across every rank and file, so each
coordinate alone fixes its square's color the moment it is read. Comparing
two squares therefore never needs either color's name — only the parities
that decide them.

## Column-plus-row parity

Painting the board explains the rule: starting from black `"a1"`, every
step to an adjacent square flips the color, so the color is decided by the
parity of `column + row` — even sums are black, odd sums are white.
`"a1"` sums to `1 + 1` and `"c3"` to `3 + 3`, both black, while `"h3"` is
`8 + 3`, odd, and white. Two squares share a color exactly when their two
sums share a parity, and raw character codes preserve those parities,
because every code differs from its numeric value by an even offset
(letters sit above the even base 96, digits above the even base 48).

So the whole test reads each string's two characters, adds their codes,
and compares the sums modulo two: four character reads, two parity tests,
one comparison. The domain is fixed at 64 legal squares, no value involved
exceeds a few hundred, and nothing grows with any input, so every language
runs exact small integers in constant time.

**Complexity:** `O(1)` time, `O(1)` space.
