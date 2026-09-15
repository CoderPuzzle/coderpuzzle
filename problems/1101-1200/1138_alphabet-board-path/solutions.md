# Solutions — Alphabet Board Path

## Per-letter walk in the order U, L, D, R

Every letter's cell is fixed — `(index / 5, index % 5)` — so the walk
decomposes into one independent leg per target letter, and each leg is
minimal exactly when it moves only toward its destination: `|Δr| + |Δc|`
moves plus the `'!'`. What makes the problem more than arithmetic is that
the board's last row holds the single cell `z`, so a leg may not pass
through row 5 outside column 0.

Emitting the moves in the order **U, then L, then D, then R** avoids every
non-existent cell by construction. Vertical moves happen while the column is
still the old one (safe, because only row 5 is truncated and `U` leaves it
while `D` enters it last); the horizontal moves `L`/`R` run in whichever
row the `U`s already reached — row 5 only ever appears as a destination, and
reaching `z` means the `L`s run before the `D`s, so the descent into row 5
happens strictly in column 0. Leaving `z` is the mirror case: the `U`s climb
column 0 before any `R` fires.

The result is one short string per leg appended to the answer, and the
whole output length is `Σ(|Δr| + |Δc| + 1)` — minimal by construction.

**Complexity:** `O(n)` time over the target letters (output length is
linear in the total Manhattan distance travelled) and `O(1)` extra space.
