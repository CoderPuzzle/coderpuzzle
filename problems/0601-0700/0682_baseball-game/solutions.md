# Solutions — Baseball Game

## Replay the record on a stack

Every operation only ever touches the end of the record. A literal appends one
score; the double reads the previous score; the sum reads the previous two; the
cancel removes the previous one. Nothing ever looks further back than the last
two entries, so the record is a stack and the operation list is a program for
it: replay the operations left to right, pushing and popping at the top, and
the game's state after each step is exactly what the rules prescribe.

The dispatch compares each operation against the three whole command strings
`"C"`, `"D"`, and `"+"`; anything else is an integer literal, which is also
what keeps a negative record such as `"-2"` out of the command branches —
integer parsing accepts the leading sign. After the replay the answer is the
sum of the scores still on the record, and an emptied record sums to `0`.

No value on the stack can stray past the fixed-width types: records are bounded
by `3 * 10⁴`, at most 1000 operations exist, and the statement guarantees the
answer and every intermediate calculation fit in a 32-bit integer, so native
`int` arithmetic is exact in every language.

**Complexity:** `O(n)` time, `O(n)` space.
