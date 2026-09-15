# Solutions — Maximum Building Height

With `n` up to `10⁹`, no per-building pass can work. The key observation
is that between restrictions the heights are forced into a ramp: starting
from 0 at building 1, the tallest profile is a straight climb of slope 1,
bent only where a restriction caps it. So only the restricted points (plus
building 1 itself, pinned to height 0) shape the answer.

## Sweep the pinned points and take the best peak

Sort the restrictions by building id and pin `(1, 0)` as the first point.
Two passes then make every cap consistent with what its neighbors allow:
walking left to right, a point's effective cap cannot exceed its left
neighbor's cap plus the id distance (you can only climb by 1 per step);
walking right to left applies the same rule from the right. After both
passes each pinned point carries the largest height it can have given all
the others.

Between two consecutive pinned points with final caps `lh` and `rh` and
gap `g`, the best achievable peak anywhere in between is
`(lh + rh + g) / 2` (floored): the profile rises from one side and falls
to the other, and the two ramps meet at that height. Past the last pinned
point the height simply ramps up for the remaining buildings. The answer
is the maximum over all these candidates — computed in `O(m log m)` for
`m` restrictions.

The arithmetic needs care in fixed-width languages: ids reach `10⁹` and
caps too, so cap-plus-distance sums reach `2 × 10⁹`, just past 32-bit
range — every intermediate here runs on 64-bit integers.

**Complexity:** `O(m log m)` time, `O(m)` space, where `m` is
`restrictions.length`.
