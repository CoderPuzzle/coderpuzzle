# Solutions — Make Array Elements Equal to Zero

The limits are tiny — at most 100 cells with values at most 100, and at
least one cell is already zero — so the process itself can be replayed
exactly as stated, once per candidate selection.

## Direct simulation

Every candidate selection is a pair `(curr, direction)` positioned on a
zero cell. For each of the at most `2n` pairs, copy the array and walk: a
zero cell advances `curr` in the current direction; a positive cell is
decremented and flips the direction before taking a step. The walk ends
when `curr` leaves `[0, n - 1]`, and the selection is counted when every
cell has reached 0 at that moment.

Termination is automatic. The direction only ever changes on a positive
cell, and each such visit decrements its value, so the number of direction
changes is bounded by the sum of the array; between two positives the walk
crosses zeros in one fixed direction, so it either reaches the next
positive or steps out of bounds. Every walk therefore ends after
`O(n + s)` steps, where `s` is the sum of `nums` — a few tens of thousands
of elementary moves across all selections at the stated bounds.

**Complexity:** `O(n · (n + s))` time, `O(n)` space.
