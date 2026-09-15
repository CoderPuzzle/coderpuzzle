# Solutions — Candy Crush

## Flag, crush, drop, repeat

Each round is one pass of the game's rules. First flag: a candy dies when it
sits in three consecutive equal cells of a row or of a column, so sliding a
window of width three over every row and every column and flagging all three
cells whenever the window holds one non-zero value flags exactly the doomed
candies — both sweeps read the board neither has written to, which is the
rule's simultaneity: an L or T junction of one candy type is flagged by both
sweeps and loses every cell in a single round. If a round flags nothing, the
board is stable and it is the answer.

Otherwise the flagged cells become `0`, and gravity settles each column on its
own: candies are non-zero values, so a write pointer walking the column from
the bottom copies every candy down past the holes and the untouched top of the
column is zeroed — holes bubble to the top, and nothing enters from outside
the board. Dropping realigns survivors into new triples, so the settled board
goes through the same round again.

Every round that flags anything removes at least one candy, and the board
starts with at most `m · n` of them, so the loop runs at most `m · n` rounds,
each a constant amount of work per cell: the flag grid is the only storage
beyond the board itself.

**Complexity:** `O((m·n)²)` time, `O(m·n)` space.
