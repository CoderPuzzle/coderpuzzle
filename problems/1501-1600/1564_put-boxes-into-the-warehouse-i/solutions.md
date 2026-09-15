# Solutions — Put Boxes Into the Warehouse I

## Effective room heights and greedy matching

A box pushed in from room 0 has to survive every room it passes through
on the way to wherever it stops, so the tallest box that could ever reach
room `i` is capped not by `warehouse[i]` alone but by the smallest room
from the entrance up to `i`. Computing that running minimum gives an
`effective` array where `effective[i] = min(warehouse[0..i])` — the real
usable height at each position, and by construction it never increases
as `i` grows.

Because `effective` only shrinks moving inward, the best rooms for large
boxes sit near the entrance, and the tightest constraints sit deepest
inside. Sorting `boxes` ascending and walking `effective` from the back
(the deepest, most constrained room) toward the front turns placement
into a single greedy sweep: at each room, if the smallest box not yet
placed fits, place it there and move on to the next-smallest box; a room
that turns even the smallest remaining box away is simply skipped. Every
room considered this way is matched to the box most likely to fit it, so
no swap could ever place more boxes overall.

**Complexity:** `O(n log n)` time, `O(n)` space.
