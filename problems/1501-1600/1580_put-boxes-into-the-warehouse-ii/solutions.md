# Solutions — Put Boxes Into the Warehouse II

## Two-sided effective heights and greedy matching

A box can now reach room `i` from either direction, so it only has to
survive whichever path is more forgiving. Entering from the left it must
clear every room from `0` to `i`, capping it at the prefix minimum of
`warehouse[0..i]`; entering from the right it must clear every room from
`n - 1` down to `i`, capping it at the suffix minimum of
`warehouse[i..n-1]`. The room actually accepts whichever cap is looser,
so the true usable height at `i` is
`effective[i] = max(prefixMin[i], suffixMin[i])`. Unlike warehouse I,
this array is no longer monotonic — a short pair of rooms in the middle
flanked by tall rooms on both sides still yields a small `effective` at
the middle and large values at the ends.

Because `effective` has no guaranteed shape, the back-to-front sweep from
warehouse I no longer applies; what still holds is that placement reduces
to matching boxes to rooms purely by capacity, since any room can be
reached and vacated independently by placing boxes in a suitable order
(fill the more constrained rooms first, before a box that must pass
through them claims a spot). Sorting both `boxes` and `effective`
ascending and sweeping them together with two pointers — advancing the
room pointer always, and the box pointer only on a fit — greedily pairs
each room with the smallest box that still fits it, which places as many
boxes as any other pairing could.

**Complexity:** `O(n log n)` time, `O(n)` space.
