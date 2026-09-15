# Solutions — Distribute Elements Into Two Arrays II

## Two Fenwick trees over compressed values

Each of the `n` operations needs `greaterCount` for both arrays — how many stored elements are strictly greater than the incoming value — and elements are only ever appended. That is an insert-plus-rank problem: compress all distinct values to ranks `1..m`, and give each array its own Fenwick tree counting occurrences by rank. Then `greaterCount(arr, x) = len(arr) - prefix_count(rank(x))`, since the elements not at most `x` are exactly those strictly greater.

The simulation seeds `arr1 = [nums[0]]` and `arr2 = [nums[1]]` with their trees loaded, then processes the remaining elements in order: compute both greater counts, append to whichever array has the strictly larger count, break ties toward the shorter array, and break remaining ties toward `arr1` (the `len(arr1) <= len(arr2)` test sends equal lengths to `arr1`, matching the rule). Each append is one Fenwick update.

Compression handles values up to 10^9 and duplicates naturally, because the trees store counts per rank and `greaterCount` uses "at most" prefix sums, which treat equal values correctly (not greater than themselves). The final answer concatenates `arr1` and `arr2`.

**Complexity:** `O(n log n)` time, `O(n)` space.
