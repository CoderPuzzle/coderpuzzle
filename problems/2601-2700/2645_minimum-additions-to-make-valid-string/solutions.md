# Solutions — Minimum Additions to Make Valid String

## Repeating-Pattern Greedy Scan

A valid string is the pattern `abc` repeated some number of times, so
imagine a second pointer stepping through that repeating pattern slot by
slot while a first pointer walks `word`. Every time the two pointers look
at equal characters, the word's letter lines up with the pattern and is
consumed. Every time they differ, the pattern moves on without the word —
which is exactly one inserted letter: an aligned slot of the final string
that no original character can occupy. This matches the fix stated in the
hints — on a mismatch, count one insertion and advance only the pattern
pointer.

When the word runs out, its last consumed letter may sit before the end of
its own cycle, and the remaining slots must be filled by insertions too:
`(3 - i % 3) % 3` more. The pointers never backtrack — each mismatch is a
slot that can never be filled by any future word character (the letters are
fixed per slot) — so the single pass already realizes the minimum; there is
no cheaper arrangement than one letter per unclaimed slot.

**Complexity:** `O(n)` time, `O(1)` space.
