# Solutions — Number of Valid Clock Times

## Independent Field Counting

The hour field and the minute field never constrain each other: whatever
digits the minutes take, the set of legal hours is unchanged, and vice
versa. So the count of valid full times is exactly
`(valid hours) × (valid minutes)` — no cross-product enumeration of 1440
candidates needed. Each field's own two digits do interact (an hour tens
of `2` caps the ones digit at 3), which is why each side is counted by a
small direct sweep — 24 candidates for hours, 60 for minutes — rather
than by multiplying per-digit choices.

The sweep reads naturally as a membership test: an integer hour matches
the pattern when its tens digit equals position 0 and its ones digit
equals position 1, treating `?` as always matching. This also makes the
degenerate inputs fall out correctly — a fully specified time counts its
single self (1 × 1 = 1), and impossible patterns such as `"37:?6"` or
`"05:6?"` count zero because no real clock time carries those digits.
Enumerating integers instead of strings sidesteps hint 2's regex entirely.

Everything fits trivially in 32-bit arithmetic: at most 24 × 60 = 1440,
and the loop bounds are constants independent of input size.

**Complexity:** `O(1)` time — 84 fixed checks — `O(1)` space.
