# Solutions — Apply Operations to Maximize Frequency Score

Each ±1 adjustment costs one operation, so a set of elements can be
herded onto a single value exactly when its total L1 distance to some
target is at most k — and the score is the size of the largest such set.

## Slide a window onto its median

After sorting, the best set is always a contiguous window. If some chosen
element had an unchosen element between it and the target, swapping them
cannot increase the total distance (their distances to the target are
ordered the same way), so an optimal set never skips a value. The
cheapest target for a window is its median: the distance sum decreases up
to the median and increases after it, staying flat between the two middle
elements for even-sized windows.

The scan slides a window [l, r] over the sorted array, keeping the cost
of flattening it at O(1) with prefix sums: raising the left part to the
median costs `median × left_count − left_sum`, lowering the right part
costs `right_sum − median × right_count`. Growing the window can only
increase the flattening cost, so l advances monotonically and the whole
sweep is linear after the sort. Costs reach n × span / 2 ≈ 5 × 10¹³ and
k reaches 10¹⁴, well inside signed 64-bit; the largest intermediate is
below 2⁵³, so JavaScript numbers stay exact.

**Complexity:** `O(n log n)` time, `O(n)` space.
