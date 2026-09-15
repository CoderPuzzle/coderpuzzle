# Solutions — Reordered Power of 2

The bound settles everything before `n` is even read: `n` stays at or below
`10⁹`, so a reordering of its digits can only ever reach the thirty powers
of two from `2⁰` through `2²⁹ = 536870912` — thirty numbers whose digit
inventories fit in a tiny fixed table, which turns the question into an
inventory match rather than a search over orderings.

## Match the digit inventory against the thirty powers

Reordering permutes digits without adding, dropping, or repeating any, so
the result is a power of two exactly when `n`'s digit inventory — how many
of each digit `0` through `9` it holds — coincides with some power's
inventory. Count `n`'s digits into a ten-slot table, then walk the powers
`1, 2, 4, 8, …` up to the bound, build the same table for each, and report
`true` on the first match; a completed walk with no match means `false`.
The walk touches thirty powers and ten slots each — a constant — so the
whole answer costs a constant multiple of `n`'s digit count.

A match is always reachable, which is why no ordering ever has to be
constructed: the power itself uses precisely `n`'s digits and, written
normally, has no leading zero, so it is one of the legal reorderings. The
leading-zero rule is exactly what sinks inputs like `10` — its zero-leading
arrangement `01` would read as `2⁰`, but that is not a legal number, and
the one legal arrangement, `10`, is no power. Thirty ten-slot tables are
all the state, so nothing grows with anything but the digit count.

**Complexity:** `O(d)` time per query, `O(1)` precomputed signatures.
