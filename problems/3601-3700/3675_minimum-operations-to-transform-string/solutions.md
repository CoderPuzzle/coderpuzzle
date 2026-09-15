# Solutions — Minimum Operations to Transform String

## Farthest-letter maximum

One operation acts on a whole letter class at once: every occurrence of
the chosen letter steps forward one position, wrapping from `z` to `a`,
and nothing else changes. Where the letters sit in the string is
irrelevant, so only which distinct letters are present matters. A letter
whose zero-based alphabet index is `i` needs `(26 - i) % 26` such steps to
become `a`, and that doubles as a per-letter lower bound on any schedule,
because an occurrence advances at most one step whenever an operation
touches it — so no plan can beat the largest such distance among the
letters appearing in `s`.

That bound is achievable: always operate on the letter with the largest
remaining distance. Distinct letters hold distinct distances, so the
choice is unambiguous; after each operation the leader's distance drops by
exactly one, and if it stepped onto a square that was occupied, the
resident joins the group and is carried from then on — its own smaller
distance gets absorbed into the leader's countdown. Every untouched letter
keeps a strictly smaller distance than the leader had, so the maximum over
the string falls by exactly one per operation and reaches zero after
precisely that many steps.

The answer is therefore just the maximum of `(26 - i) % 26` over the
distinct letters of `s`: scan once, widen `ch - 'a'` to an integer before
the subtract-and-mod (fixed-width languages wrap otherwise), and keep the
best value seen. Neither the order of the letters nor how often each one
repeats plays any role.

**Complexity:** `O(n)` time, `O(1)` space.
