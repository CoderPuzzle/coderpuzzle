# Solutions — Minimum Operations to Convert All Elements to Zero

## Monotonic stack window counting

One operation zeroes every occurrence of the window's minimum, so an
operation is best understood as "finish one (value, window) group": the
value `v` it targets, and a maximal span of the array free of anything
smaller than `v` — both smaller survivors and already-zeroed positions
block a window, since they would become the minimum instead. Zeroing
values in increasing order realizes exactly one group per operation, and
no plan can beat that: occurrences of `v` separated by a smaller value
can never share a window, and each operation has a single minimum. The
answer is therefore the number of (value, maximal window) pairs.

A left-to-right monotonic stack counts those pairs in one pass. The stack
holds the minima of the windows currently open at the scan position —
strictly increasing bottom to top, like a skyline. On reading `x`, every
stack value above `x` closes (its window ended); a positive `x` then
either matches the new top, continuing an existing window's group, or
exceeds it, opening a new group and costing one operation. A zero pops
everything and counts nothing, since zeroed positions never need an
operation of their own. Equal neighbors thus merge into one operation
(the `[1,2,1,2,1,2]` example), while valleys split them.

Each element is pushed and popped at most once, so the pass is linear
despite the nested loop. The count fits easily in 32 bits — it is bounded
by `n ≤ 10⁵`.

**Complexity:** `O(n)` time, `O(n)` space.
