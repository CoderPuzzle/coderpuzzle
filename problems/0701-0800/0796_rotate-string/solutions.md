# Solutions — Rotate String

Shifting `s` k times peels the first k characters off — in order — and
drops them onto the end, so the reachable strings are exactly the
rotations `s[k:] + s[:k]` for k from 0 to n-1. Rather than generating each
rotation, one doubled copy of `s` puts all of them on display at once.

## Doubling and substring search

Write `s` twice in a row. A window of length n starting at offset k inside
`s+s` reads `s[k:]` followed by `s[:k]` — precisely the k-shift rotation —
and every k from 0 to n-1 gets such a window, so the doubled string exhibits
each reachable string as a contiguous block. `goal` is therefore reachable
exactly when it occurs somewhere inside `s+s`.

Length equality must hold first: a shift never changes the length, and
without the check a strictly shorter `goal` could hide inside `s+s` (say
`"ab"` inside `"abcdeabcde"`) while being no rotation at all. With the
lengths known equal, containment is exact in both directions, since a
length-n substring of `s+s` starting at offset k < n is the k-shift rotation
itself. One length comparison plus one substring search over the 2n-character
doubled string settles the question.

**Complexity:** `O(n)` time, `O(n)` space.
