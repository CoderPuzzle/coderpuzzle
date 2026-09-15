# Solutions — Total Distance to Type a String Using One Finger

## Keyboard coordinate walk

The cost of a move depends only on which two keys it connects, so the
whole answer reduces to knowing where every letter sits. The keyboard is
three ragged rows — `qwertyuiop` in columns 0 through 9, `asdfghjkl` in 0
through 8, `zxcvbnm` in 0 through 6 — and one pass over those row strings
records each letter's (row, col) cell into two 26-entry tables. The
finger then walks the string left to right from its start on 'a', adding
the Manhattan distance |r1 - r2| + |c1 - c2| for every character typed
and leaving the finger on that key for the next move. Typing the same
letter twice in a row is a zero-distance move, which the running sum
handles with no special case.

Every value stays small. The largest move this grid allows is 11 (the
|0 - 2| + |9 - 0| hop between 'p' and 'z'), and s holds at most 10⁴
characters, so the total is bounded by 110,000 — far inside a 32-bit
integer and exact as a JavaScript number well below 2⁵³. Beyond the two
fixed tables the walk allocates nothing, and one pair of table lookups
per character is all the work there is.

**Complexity:** `O(n)` time, `O(1)` space.
