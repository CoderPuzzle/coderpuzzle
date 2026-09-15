# Solutions — Can Make Arithmetic Progression From Sequence

## Sort, then check consecutive gaps

An arithmetic progression is, by definition, already in sorted order once
you pick the right direction — its consecutive differences are constant. So
if `arr` can be rearranged into one at all, sorting it ascending must
produce that arrangement (or its exact reverse, which has the same set of
gaps). This turns "does some reordering work" into "does the one canonical
reordering work," which is easy to check.

Sort a copy of `arr`, take the gap between the first two elements as the
target common difference, then walk the rest of the array comparing each
consecutive gap against it. Any mismatch means no rearrangement can make the
whole sequence evenly spaced, so the answer is `false`; reaching the end
without a mismatch confirms `arr` is already (after sorting) a valid
progression. A two-element array always succeeds trivially, since a single
gap is always "constant."

**Complexity:** `O(n log n)` time, `O(n)` space (or `O(log n)` for the sort's
own recursion, depending on the sorting routine).
