# Solutions — Latest Time You Can Obtain After Replacing Characters

## Descending Time Enumeration

The `"?"` seats are wildcards and every other seat is pinned, so a time is
obtainable exactly when none of its five characters contradicts `s`. There
are only `12 * 60 = 720` legal 12-hour times, so the direct route the hint
suggests costs nothing: walk all of them in ascending order, remember each
one that matches, and the last remembered value is the latest obtainable
time. The ascending pass makes "latest" fall out for free — no explicit
comparison of candidate strings is needed beyond overwriting.

The pattern test is positional: character `i` accepts either an exact match
or a `'?'` in `s`, with the fixed colon at index 2 acting as an ordinary
pinned seat. Zero-padding keeps every comparison textual — candidates are
built as two-digit hours plus two-digit minutes, so equality checking never
worries about digit counts or ordering.

The statement's guarantee that some valid time exists means the answer is
always found; a pattern that admits no time cannot occur. Total work is one
pass over 720 constant-size candidates.

**Complexity:** `O(1)` time (`12 * 60` candidates), `O(1)` space.
