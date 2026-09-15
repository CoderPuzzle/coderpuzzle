# Solutions — Determine the Winner of a Bowling Game

## Lookback simulation

The doubling rule is purely local: a turn's pins count double exactly when
one of the two preceding turns was a strike, so each player's score can be
computed independently with a single pass that inspects a two-element
window behind every turn. There are no carry-over decisions, no ordering
traps — just read the window, add `2x` or `x`, move on.

Both scores fit comfortably in 32 bits even at 1000 turns of tens (20000
at most), and comparing them answers the return contract directly: sign of
the difference mapped to 1 / 2 / 0. The same window logic works at every
position because Python-style slicing and saturating indices collapse the
edge cases where fewer than two earlier turns exist.

**Complexity:** `O(n)` time, `O(1)` space beyond the inputs.
