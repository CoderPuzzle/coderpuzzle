# Solutions — Maximize Sum of At Most K Distinct Elements

## Dedupe, sort descending, take k

Every copy of a value beyond the first is dead weight: the rule forbids
picking it twice, and since all values are positive, spending one of the `k`
picks on a duplicate can only lower the sum compared with picking an unused
value instead. So the frequency of each value is irrelevant — only which
distinct values exist matters — and the whole input collapses to its set of
distinct values without losing any candidate worth considering.

With the candidates deduplicated, maximality falls out of a greedy argument.
The best possible choice uses exactly `min(k, d)` values, where `d` is the
number of distinct values: positives make a larger pick count strictly
better, and among choices of that size, swapping any picked value for a
larger unpicked one raises the sum. The unique optimum is therefore the `k`
largest distinct values — or all `d` of them when `d < k`, which is the "at
most" in the statement. Sorting the distinct values in descending order puts
those winners at the front, and the sorted prefix read left to right is
already in the required strictly descending output order.

The work is dominated by the sort; building the set and slicing the prefix
are linear passes over inputs bounded by `n <= 100`.

**Complexity:** `O(n log n)` time, `O(n)` space.
