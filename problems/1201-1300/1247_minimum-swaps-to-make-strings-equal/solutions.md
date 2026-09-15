# Solutions — Minimum Swaps to Make Strings Equal

## Count the two mismatch shapes

Positions where `s1` and `s2` already agree never matter — a swap involving
one is never forced and never helps. Each mismatching position is one of two
shapes: `(x, y)` or `(y, x)`. Every swap exchanges one character between the
strings, so each swap fixes exactly two mismatching positions — as a parity
invariant, equalizing the strings needs the mismatch total to be even, which
forces `xy + yx` even, i.e. `xy` and `yx` have the same parity.

Two mismatches of the same shape cost one swap (`xx / yy` aligns both), and
two of opposite shapes cost two (`xy / yx` needs a detour through an
intermediate state). Pairing greedily — same-shape pairs first at 1 swap
each — leaves either nothing (answer: `xy/2 + yx/2`), one pair of each shape
(answer: that plus 2), or a single lone mismatch (impossible, `-1`).

Folding those cases gives the closed form: impossible when `xy + yx` is odd;
otherwise `xy / 2 + yx / 2 + (2 if both counts are odd else 0)`.

**Complexity:** `O(n)` time, `O(1)` space.
