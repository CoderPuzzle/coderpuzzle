# Solutions — Flip Game

## One left-to-right scan

A move is completely local: it needs a position `i` whose two characters are
both '+', and the state it produces is the same string with positions `i` and
`i + 1` turned into "--" — everything before and after the pair is untouched.
So the answer needs no game search at all: one scan over `currentState`
visits every position, and each one holding a "++" pair contributes exactly
one state, `currentState[:i] + "--" + currentState[i + 2:]`.

The scan order is already the pinned answer order. Ascending `i` appends the
state made by flipping the earlier pair first — for `"++++"` the scan flips
the pair at 0, then at 1, then at 2, yielding `["--++","+--+","+--"]` — so
nothing sorts or deduplicates the collected list afterwards, and overlapping
pairs such as the middle of `"+++"` are naturally distinct states.

A string with no "++" anywhere — all minus signs, or pluses kept apart by
minus signs — never passes the pair test, so the list stays empty: the
statement's no-valid-move case.

**Complexity:** `O(n²)` time — up to `n - 1` states, each one `O(n)` splice —
and `O(n²)` space for the emitted states, `O(1)` auxiliary beyond them.
