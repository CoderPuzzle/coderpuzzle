# Solutions — Sort Characters By Frequency

## Count into a fixed table, then order the table

The output depends on exactly two facts per character — which character it is
and how often it occurs — so the first pass reduces `s` to a frequency table:
one slot for each of the 128 possible characters, filled in a single scan. The
alphabet is fixed, so that table has constant size no matter how long `s` is.

Ordering the table is therefore constant work: sort the populated slots by
frequency, highest first, and — this bank's pin for the "return any of them"
clause — by character ascending when frequencies tie. Emitting `count` copies
of each character in that order rebuilds the string. The pin is visible in
every example: `r` before `t` at frequency 1, `a` before `c` at frequency 3,
and `A` before `a` at frequency 1, since `'A'` and `'a'` are different
characters.

Nothing in the method is sensitive to language beyond builder mechanics — a
`join` in Python, a `StringBuilder` in Java, repeated `append`/`push` calls
elsewhere — because the sort runs over at most 128 entries and never dominates
the counting pass.

**Complexity:** `O(n + k log k)` time with `k <= 128` distinct characters —
effectively `O(n)`; `O(k)` extra space.
