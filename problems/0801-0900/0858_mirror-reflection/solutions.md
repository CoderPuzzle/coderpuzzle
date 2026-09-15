# Solutions — Mirror Reflection

Every bounce off a mirrored wall can be undone by reflecting the room instead
of the ray, so the zigzag path is really a straight line crossing an infinite
tiling of square rooms. Which receptor is met first is therefore a fact about
where that line first lands on a corner of the tiling — and two parities, read
off after one gcd reduction, decide it.

## Unfold the room and read the corner's parity

Unfolding turns the ray into the straight line `y = (q/p)·x` running from the
southwest corner through copies of the room. A receptor is met exactly when
this line reaches a corner of the tiling — a point a whole number of room
widths `p` along both axes. Writing `g = gcd(p, q)`, the smallest `k` that
makes `q·k` a multiple of `p` is `k = p/g`, so the first corner crossing sits
`p/g` rooms across and `q/g` rooms up; those two counts carry everything.

Folding them back into the original room: an odd count of rooms across ends
on the east wall and an even count on the west, while an odd count up ends on
the north wall and an even count on the south. The reduced pair `p/g`, `q/g`
is coprime, so it is never both even and exactly three outcomes exist — east
and north is receptor 1, west and north is receptor 2, east and south is
receptor 0. Example 1 (`p = 2`, `q = 1`) crosses two rooms (even, west) while
rising one (odd, north) and lands on the northwest receptor 2; example 2
(`p = 3`, `q = 1`) crosses three (east) and rises one (north) for the
northeast receptor 1.

The code computes `g` with the iterative Euclidean loop, divides it out of
both parameters, and answers from the two parities. Every value stays at the
input's own scale of at most 1000, so the 32-bit parameter width carries all
intermediates in every language.

**Complexity:** `O(log min(p, q))` time, `O(1)` space.
