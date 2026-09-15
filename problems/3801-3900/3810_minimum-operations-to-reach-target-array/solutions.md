# Solutions — Minimum Operations to Reach Target Array

## Distinct values among the mismatches

Watch what a single operation can touch. Choosing a value x rewrites exactly
the cells whose current value is x — every maximal x-segment lands on its
target values simultaneously — and leaves every other cell alone. A rewritten
cell ends on its target, so an operation never breaks an already-matched cell
(matched cells inside a rewritten segment are set to the value they already
have), and a mismatched cell keeps its current value right up to the moment
it is fixed. The consequence is that the mismatched cells split into classes
by current value: naming a value clears its entire class, because every cell
holding x sits in some maximal x-segment and every maximal x-segment is
rewritten together.

Both bounds meet at the class count. No plan can do better than one
operation per class — an operation chosen for x cannot touch cells of any
other current value, so two different classes can never be cleared by the
same operation — and one operation per class suffices, since repeatedly
choosing any value still present among the mismatches shrinks the mismatch
set by that whole class each time. The minimum is therefore the number of
distinct values nums[i] takes over the positions where nums[i] != target[i];
positions that already match contribute nothing, however many rewritten
segments they sit inside.

The walk is a single pass over both arrays: insert nums[i] into a hash set
exactly where it differs from target[i], and return the set's size. With n at
10⁵ the answer stays far inside 32-bit range (and exact as a JS Number),
since it can never exceed the number of cells.

**Complexity:** `O(n)` time, `O(n)` space.
