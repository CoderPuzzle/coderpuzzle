# Solutions — Largest Values From Labels

## Greedy by descending value

The subset constraint is per-label, not per-position, so the optimal
choice is greedy: consider items from largest value to smallest and take
one whenever doing so stays within both limits. Pairing each `values[i]`
with its `labels[i]` and sorting those pairs by value descending makes
the highest-valued items appear first. A hash map from label to the
number of items already chosen with that label enforces `useLimit`, and a
counter enforces `numWanted`; the scan stops early once `numWanted` items
are collected.

This never misses a better choice: at every step, if an item is
skipped it is because its label is already at the cap, and taking any
lower-valued item now could only reduce the sum. Passing over the
highest remaining valid item is always safe, so the running total is the
maximum possible.

**Complexity:** `O(n log n)` time for the sort and `O(n)` space for the
pairs and the label counts, where `n` is the number of items.
