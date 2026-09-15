# Solutions — Minimum Number of Groups to Create a Valid Assignment

Boxes never mix values, so an arrangement is fully described by how each
value's copies are split across boxes, and the balance rule collapses to a
single number: some size s such that every box holds exactly s or s + 1
balls. The question then becomes which s packs every frequency into the
fewest boxes, and the smallest frequency in the input bounds how far s can
reach.

## Enumerate the smallest box size over value frequencies

Count the frequency of every distinct value and sweep s from 1 up to the
smallest frequency m; a box needs at least s copies of its value, so no s
beyond m can hold the rarest value, while s = 1 always packs anything.
For a fixed s, a value with frequency f fits into g boxes exactly when
g·s ≤ f ≤ g·(s + 1), because g boxes of sizes s and s + 1 realize every
count in that inclusive range and nothing outside it. Writing
a = f / (s + 1) and b = f % (s + 1), the cheapest such g is a boxes of
size s + 1 when b = 0, and a + 1 boxes — a - (s - b) large ones and
s - b + 1 small ones — when the remainder can be absorbed, which needs
s - b ≤ a; any larger remainder leaves f impossible to pack and
disqualifies that s entirely.

Summing the cheapest box counts over all distinct values gives the total
for each s, and the smallest total wins. The sweep is cheap: every
frequency is at least m, so there are at most n / m distinct values and
the nested loop over s and values performs O(n) work in total. All counts
are bounded by n ≤ 10⁵, comfortably inside 32-bit integers.

**Complexity:** `O(n)` time, `O(n)` space.
