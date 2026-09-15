# Solutions — Find the Divisibility Array of a String

## Rolling Prefix Remainder

Prefix "998244353" is only nine digits long, but at `n = 10⁵` a prefix
is a number with up to `10⁵` digits — no fixed-width integer can hold
one, and re-parsing each of the `n` prefixes from scratch would be
`O(n²)` digit work anyway. The hint points at the escape hatch: we
never need the numeric value itself, only its remainder modulo m.

Keep one running remainder r, updated per character by the congruence
`(10·r + d) mod m` — appending a digit d multiplies the old value by
ten and adds d, and both steps commute with taking the remainder, so
induction gives that after reading character i, r equals the full
prefix's value mod m. Then `div[i] = 1` exactly when r hits zero. The
typed languages must do the multiply-add in 64-bit words: with
`m <= 10⁹` the intermediate `10·r + d` reaches just past `10¹⁰`,
which overflows 32 bits but stays under five orders of magnitude below
the 2⁵³ where JavaScript/TypeScript numbers lose exactness.

**Complexity:** `O(n)` time, `O(1)` extra space (besides the output).
