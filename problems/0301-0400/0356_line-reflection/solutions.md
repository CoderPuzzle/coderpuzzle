# Solutions — Line Reflection

## Hash set, one pass

The axis is not free to wander. Reflection carries the leftmost column of
points onto the rightmost, so any line that works sits exactly halfway
between them: x = (min_x + max_x) / 2. That pins a single candidate, and it
is safer to characterize it by the integer sum s = min_x + max_x than by a
divided coordinate — the axis may fall between two columns, as it does for
the points (0,0) and (1,0), and exact integer arithmetic never blurs those
half positions.

The check is then one membership question per point. Every point goes into
a hash set first, stored as an (x, y) pair so both coordinates travel
together and a point can never pair with a stranger at the same x; then each
point asks whether its mirror (s - x, y) is present. If any lookup comes up
empty, reflection would move that point somewhere unoccupied and the answer
is false; if every lookup succeeds, the whole set folds onto itself across
the axis.

Repeated points need no special handling: the set collapses them, so a
duplicated point simply reflects onto a copy of itself, and one point (or
any number of identical points) is its own mirror and answers true. This is
also the Follow-up's answer — the hash set replaces the O(n²) all-pairs
scan with constant-time lookups, so the judgment is linear end to end.

**Complexity:** `O(n)` time, `O(n)` space.
