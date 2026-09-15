# Solutions — Apply Bitwise Operations to Make Strings Equal

The operation only ever acts on a chosen pair, so everything reduces to
what it does to two bits. That local truth decides reachability between
whole strings through a single membership invariant.

## Presence-of-a-one invariant

Reading `(OR, XOR)` off the four value combinations gives
`(0,0) -> (0,0)` (unchanged), `(0,1)` and `(1,0) -> (1,1)` (a new one is
born), and `(1,1) -> (1,0)` (one one dies while its partner survives as
a `1`). Two structural facts follow. An all-zero string is frozen:
every pair it offers is `(0,0)`, so no operation can produce the first
`1`. And a string holding a `1` keeps at least one forever: the only
move that turns a cell to `0` consumes _two_ ones and simultaneously
writes `1` into the partner cell, so ones thin out but never vanish.

Those facts are sufficient as well as necessary. Given any position `p`
with `s[p] = 1`, each zero can be flipped by pairing it against an
untouched one (`(0,1) -> (1,1)` repairs `s[i]` and leaves the anchor
intact), producing all ones; from all ones every unwanted `1` can be
switched off by pairing it against a surviving anchor whose final value
stays `1`. So any string containing a `1` reaches every target of equal
length that also contains one — including target itself when both sides
are already equal — and the mixed-presence pairs are exactly the false
answers. One substring test per side settles the question.

**Complexity:** `O(n)` time, `O(1)` space.
