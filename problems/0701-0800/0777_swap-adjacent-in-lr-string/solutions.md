# Solutions — Swap Adjacent in LR String

Each move slides an L one seat left across an X, or an R one seat right
across an X. The letters therefore keep their left-to-right order and never
change kind — only their positions drift through the X's. Deciding
reachability needs no simulation of the moves at all: pair up the letters of
the two strings and check that every one drifts in its allowed direction.

## Two pointers over the letter skeletons

Advance one pointer through `start` and one through `result`, hopping over
every X, so the two pointers always address the i-th letter of each string.
The letters themselves must agree: an L can never become an R, and since
neither letter can pass the other, the i-th letter of `start` must pair
with the i-th letter of `result` — a mismatch means some two letters would
have had to cross. Each pair must also respect its letter's direction: an L
only ever moves left, so its index in `result` may not exceed its index in
`start`, while an R only ever moves right, so its index may not fall short.
If one string runs out of letters while the other still has one, the letter
counts differ and the pairing fails the same way.

These two conditions are also sufficient: any pair that satisfies them can
be realized by walking each letter across the X's separating it from its
target, taking the R's right-to-left and the L's left-to-right so no letter
ever blocks another's path. Both pointers only move forward, each crossing
its string once, and nothing is stored beyond the two indices.

**Complexity:** `O(n)` time, `O(1)` space.
