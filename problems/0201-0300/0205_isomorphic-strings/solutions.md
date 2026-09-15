# Solutions — Isomorphic Strings

## Two parallel maps

The definition states its own data structure. "All occurrences of a character must be replaced with another character" says every character of `s` keeps a single consistent replacement — a forward map from `s`'s characters to `t`'s. "No two characters may map to the same character" says every character of `t` is claimed by at most one source — a reverse map from `t`'s characters back to `s`'s. Each clause of the contract becomes one dictionary, with nothing left over to check separately.

A single left-to-right pass — order must be preserved, so position pairs position — feeds both maps at once. At each index, if the forward map already binds the source character to a different replacement, or the reverse map already binds the target to a different source, the pairing is impossible and the answer is `false` on the spot; otherwise both directions record the pair. A character replacing itself needs no special case: it is a fixed point both maps agree on, which is exactly what "a character may map to itself" allows. A length guard up front returns `false` for strings that cannot be aligned position for position at all.

Both maps are bounded by the ASCII alphabet the constraints allow, so their size never grows with the input. The walk touches each position once and stops early on the first conflict — though a conflict can hide at the very last position, so the worst case still reads everything.

**Complexity:** `O(n)` time, `O(1)` space.
