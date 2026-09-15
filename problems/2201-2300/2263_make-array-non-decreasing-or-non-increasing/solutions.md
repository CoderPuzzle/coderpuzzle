# Solutions

## Slope-trick heap sweep, both directions

The cost to reshape the array into a monotone sequence is an L1 problem:
choose target values `t[i]` that are non-decreasing (or non-increasing) while
minimizing `sum |nums[i] - t[i]|`. Process elements left to right while a
max-heap collects the targets chosen so far. For each new element, tentatively
set its target to its own value: push it, and if the heap maximum now exceeds
it, every previously committed target above the current value must come down.
Paying `max - v` lowers that slope segment onto `v`, so pop the max and push a
second copy of `v` — the duplicate records the plateau the optimal solution
settles on. The accumulated payments are exactly the minimum cost of a
non-decreasing reshaping.

Running the same procedure on the negated array measures the best
non-increasing cost, since decreasing order over negated values is increasing
order over the originals. The answer is the smaller of the two sweeps.

**Complexity:** `O(n log n)` time, `O(n)` space.
