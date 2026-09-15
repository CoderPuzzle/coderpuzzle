# Solutions — Smallest Number in Infinite Set

## Threshold Marker Plus Removed-Values Set

The set is conceptually infinite, but only values that have been popped
can ever leave and return, so the whole state fits in two pieces: a
threshold `next_new`, where every value below it has been popped at
least once and every value at or above it has never been touched, and a
set holding exactly those popped values that were added back. The
invariant does the bookkeeping for free — no structure ever stores an
unbounded range of untouched integers.

`popSmallest` answers from whichever side holds the true minimum. If
the added-back set is nonempty its minimum is below the threshold by
construction (only popped values can re-enter), so removing its
smallest member is correct; otherwise the answer is the threshold
itself, which then advances past one more never-popped value. A pop
from the threshold region therefore costs nothing but an increment.

`addBack` is a single guard plus an insert: a value still at or above
the threshold was never removed, and adding it back would violate the
"in set minus threshold" invariant, so such calls are ignored. Only
values strictly below the threshold enter the set. Duplicate adds are
harmless because set membership is idempotent.

**Complexity:** `O(m + m log m)` total over `m` calls (min scans and
set operations on at most `m` stored values), `O(m)` space.
