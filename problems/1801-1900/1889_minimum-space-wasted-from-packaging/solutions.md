# Solutions — Minimum Space Wasted From Packaging

For a fixed supplier the assignment is forced — each package takes its
smallest fitting box, because waste is `sum(box sizes) - sum(package
sizes)` and the package sum is fixed. So scoring one supplier means
computing `sum(chosen box)` over all packages quickly, and that is a
prefix-sum query per box size.

## Sorted packages with prefix sums

Sort the packages and build prefix sums. For a supplier, sort its box
sizes ascending; boxes are then processed in increasing capacity. All
packages up to (but not including) the first box go to... more precisely,
between consecutive box sizes `b_prev` and `b`, every unassigned package
with size in `(b_prev, b]` fits exactly the box `b`. Binary search the
count of packages `<= b`, add `(count - assigned) * b - range_sum` to
the waste, and advance. A supplier whose largest box cannot hold the
biggest package is skipped outright. Take the minimum waste over
suppliers; `-1` if none qualifies.

Waste magnitudes reach `10^5` packages times `10^5` box size
difference, i.e. up to ~`10^10`, so accumulate in 64 bits and reduce
modulo `10^9 + 7` only at return time.

**Complexity:** `O(n log n + T log n)` where `T = sum(boxes[j].length)`
is the total number of box sizes, `O(n)` extra space.
