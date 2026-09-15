# Solutions — Third Maximum Number

## One pass, three slots

Only the three largest distinct values matter, so a single pass can carry them
in three slots — `first`, `second`, `third` — each holding either a value or
nothing yet. Every element either equals a value already tracked, a repeat
that changes nothing and is skipped outright, or it enters the window and
pushes the smaller slots down. What survives the pass is the distinct order:
`third` is the answer, and if it never filled there is no third maximum, so
the fallback returns `first`.

Distinctness is decided before any comparison: an element equal to any
occupied slot is dropped, so a duplicate of the top value can never hold two
slots. The insert tests are strict — only a strictly greater value displaces
a slot — so equal values never shift the window. Both rules together are what
`[2,2,3,1]` exercises: the two 2s count once as the second distinct maximum,
leaving 1 as the third.

An unoccupied slot is marked explicitly (None, null, an Option) rather than
with a sentinel constant, because the values span the full 32-bit range: the
third maximum can legitimately be `-2147483648` itself, and a sentinel like
INT_MIN cannot tell an empty slot from one holding the minimum. Three slots
of state and one comparison chain per element also answers the follow-up —
no sorting, one pass.

**Complexity:** `O(n)` time, `O(1)` space.
