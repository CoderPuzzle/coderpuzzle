# Solutions — Split Concatenated Strings

## Standing forms and one breakpoint exception

Every string that does not carry the breakpoint occupies one fixed-length slot
of the loop, and an orientation choice never changes a slot's length, so the
lexicographically largest loop uses each such string at its larger orientation
`max(s, reversed(s))` — call these the standing forms, built in one pass. Any
loop that keeps a string below its standing form is dominated character for
character by the same loop with the form restored, so the standing forms are
optimal for every string the breakpoint does not touch.

The breakpoint string is the exception, and forcing it to its standing form
first is the classic error. Cutting it at position `k` puts its suffix at the
head of the regular string and its prefix at the tail, so both pieces come from
one orientation-and-cut decision — a smaller orientation can pay for itself
with a better head, or a better tail after the rest of the loop. It must
therefore be enumerated in both orientations at every cut position, its own
suffix leading, not pre-shrunk to `max(s, reversed(s))`; three identical
`"abc"` strings already separate the two policies.

Assembly keeps the loop order: with the breakpoint in string `i`, the candidate
is that suffix, then the standing forms of strings `i+1, i+2, …` wrapping
around the loop, then the prefix. Joining the `n-1` successors once per
breakpoint string makes each candidate a three-part concatenation, and the
largest candidate over every string, both orientations, and every cut wins.

**Complexity:** `O(total²)` time worst case — every one of the `2·total` cuts
builds a `total`-length candidate — and `O(total)` space.
