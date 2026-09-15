# Solutions — Furthest Point From Origin

## Spend every underscore on one side

The fixed moves leave nothing to decide: each `'L'` steps −1 and each
`'R'` steps +1 unconditionally, so after playing only them you sit at
the offset `left − right`, where `left` and `right` count the two fixed
characters. Only the underscores are choices — each can be spent as
either step — and Hint 1 observes they should never split: any mixture
only lets some of them cancel against the rest, so an optimal answer
rewrites every `'_'` with one single character.

Which character to pick follows from the offset. Extending the side the
fixed moves already favor pushes every underscore another unit away
from the origin, while extending the weaker side first has to burn
`|left − right|` of its supply just to cross back past 0. The furthest
reachable point is therefore `|left − right| + wilds`: for `"L_RL__R"`
the two sides tie at 2 and the three underscores add up to a distance
of 3; for `"_______"` there is no commitment at all, so all seven
wildcards stack to reach point 7.

Nothing larger than the input length can ever be produced, so plain
32-bit counters hold the arithmetic comfortably throughout.

**Complexity:** `O(n)` time, `O(1)` extra space.
