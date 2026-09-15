# Solutions — Finding the Number of Visible Mountains

## Sort by x, then one monotonic-stack sweep

Mountain `(x, y)` contains peak `(a, b)` exactly when `|a - x| <= y - b` —
the peak sits inside or on the slopes of the triangle. That containment is
one-sided in `x`: a mountain can only hide peaks at its own height or
below. Sorting the peaks by `x` ascending (breaking ties by `y` descending)
therefore lines every potential coverer up before the peaks it can cover,
and the whole problem collapses to a single left-to-right pass.

The pass keeps a stack of mountains that are still candidates for
visibility. When a new mountain arrives it first pops every stacked
mountain whose peak falls inside it — those are hidden and gone for good,
since no later mountain hides them any less. It is then itself tested
against the new top: if its peak lies inside that mountain's slopes it is
discarded without being pushed; otherwise it joins the stack. Amortized
`O(1)` work per peak follows because each mountain is pushed and popped at
most once.

Two edge details finish the count. Duplicate peaks must be collapsed with
their multiplicity kept: identical mountains lie within each other, so any
duplicated peak is invisible — yet an invisible duplicate still hides other
peaks, which is why duplicates are filtered only when the final stack is
tallied, never skipped during the sweep. And containment uses `<=`, so a
peak sitting exactly on another's slope counts as covered, matching the
statement's border rule.

**Complexity:** `O(n log n)` time (the sort), `O(n)` space.
