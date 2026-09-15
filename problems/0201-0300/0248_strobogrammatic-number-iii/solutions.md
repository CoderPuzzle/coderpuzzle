# Solutions — Strobogrammatic Number III

## Closed-form interior lengths, pruned boundary walk

A strobogrammatic string is decided entirely by its first half: the outermost
digit picks from `1, 6, 8, 9` (a leading zero is forbidden, except for `"0"`
itself), every inner pair from `0, 1, 6, 8, 9` (5 ways, partner forced), and
an odd length's middle from `0, 1, 8` (3 ways, since 6 and 9 must pair with
each other). So every length strictly between `len(low)` and `len(high)` —
and there are at most 13 of them — is a plain product `4 · 5^p · 3^q`, never
enumerated. Because neither boundary has leading zeros, a longer
strobogrammatic number is always the larger one, which means only two
lengths ever touch a boundary: candidates of `len(low)` must clear `low`,
candidates of `len(high)` must not exceed `high`.

For a boundary length the count walks the half-positions outermost-in while
the prefix stays equal to the boundary's. At each position, every allowed
digit larger than the boundary's digit settles the comparison right there —
the first differing position decides everything — and the inner
half-positions then complete freely, in exactly the products above, so each
such digit contributes one multiplied count instead of a subtree. A boundary
digit outside the allowed set (a `7`, or a `6` in the middle seat) kills the
equal-prefix chain on the spot. If the whole first half matches, the single
survivor is the mirror completion of the boundary's own first half, compared
directly. Throughout, lexicographic order on equal-length digit strings is
numeric order, because no candidate and no boundary carries a leading zero.

The answer then assembles as `count(>= low)` at `low`'s length, plus the
closed forms for every length from `len(low) + 1` through `len(high)`
inclusive, minus `count(>= high)` at `high`'s length. That subtraction also
drops `high` itself, so `high` is added back exactly when `high` is
strobogrammatic — one linear mirror check. Two small facts keep the edges
honest: `0` is strobogrammatic (the `["0", "0"]` example answers `1`), and
`6` and `9` alone are not, since each rotates into the other.

**Complexity:** `O(L²)` time, `O(L)` space, where `L = high.length` — a few
hundred integer operations at the 15-digit ceiling.
