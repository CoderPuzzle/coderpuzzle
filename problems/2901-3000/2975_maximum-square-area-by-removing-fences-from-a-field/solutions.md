# Solutions — Maximum Square Area by Removing Fences From a Field

## Common pairwise differences of the two directions

Every square side is a distance between two surviving horizontal fence
lines and, at the same time, a distance between two surviving vertical
fence lines. Fences only get removed, never moved, so the set of
achievable horizontal distances is fixed up front: add the two immovable
border fences at `1` and `m`, and every pair of positions contributes
one candidate side. Same for the vertical direction with `1` and `n`.

With at most 602 positions per direction, all `O(602²)` pairwise
differences are cheap to enumerate. Collecting the horizontal
differences in a hash set and scanning the vertical ones for the largest
value also present gives the best side; if the two sets share nothing,
the answer is `-1`.

The side is below `10⁹`, so its square stays below `2⁶³` — but the
statement asks for the area modulo `10⁹ + 7`, applied once at the end.
(In JavaScript the square exceeds `2⁵³`, so that pair multiplies through
BigInt to stay exact.)

**Complexity:** `O(h² + v²)` time for the pairwise differences,
`O(h²)` space for the horizontal set.
