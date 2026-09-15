# Solutions — Find Mirror Score of a String

Each index wants one thing: the closest unmarked earlier index holding the
mirror letter. Marking removes indices permanently and pairs never cross,
so the whole process is a sequence of local nearest-available matches that
a per-letter stack answers in constant time.

## One stack per letter

The mirror map is the fixed involution `'a' <-> 'z'`, `'b' <-> 'y'`, ...,
thirteen pairs with no fixed letter, so every index only ever searches for
one specific other letter. Keep a stack of still-unmarked indices for each
of the 26 letters and sweep `s` left to right. At index `i` with letter
`c`, look at the stack of the mirror letter `25 - c`: its top is the most
recently pushed — hence the closest — unmarked candidate, because anything
pushed earlier lies further left and anything marked has already been
popped. If the stack is non-empty, pop it, mark both sides implicitly, and
add `i - j` to the score; otherwise push `i` onto `c`'s own stack and wait
for a future mirror to claim it.

Why the top of the stack is always exactly the closest unmarked index is
the crux. A marked index is popped the moment it pairs, so stacks hold only
unmarked positions; and positions enter each stack in increasing order, so
the top is the largest — the nearest to `i` — of them. Popping on match is
what keeps the invariant through the marking step. An unmatched letter
simply accumulates, which is precisely the statement's "move on without
making any changes" case.

The score is a sum of distances that reaches 2,500,000,000 on the extreme
input `aaa...zzz` (50,000 pairs at distances 1, 3, ..., 99,999), so the
total is tracked in a 64-bit accumulator; every index is pushed once and
popped at most once.

**Complexity:** `O(n)` time, `O(n)` space.
