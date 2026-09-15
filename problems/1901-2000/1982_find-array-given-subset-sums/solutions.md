# Solutions — Find Array Given Subset Sums

## Greedy Pairing on Sorted Sums

After sorting the multiset of `2^n` subset sums, the two largest values differ by exactly one element of the hidden array: the maximum subset sum either contains the largest-magnitude element or it does not, and those two sums (which are the two largest) differ by that element. Call the difference `diff`. Every subset sum `s` pairs with `s + diff` — the same subset with the element added — so the whole multiset partitions into `(sum without element, sum with element)` pairs. Walking the sorted list with a counter and consuming one `x` and one `x + diff` per step splits the sums into two equal halves: `left` (subsets excluding the element) and `right` (subsets including it).

The empty subset has sum 0, so whichever half contains 0 is a valid, self-consistent set of subset sums for the remaining `n - 1` elements. If 0 lies in `left`, the recovered element is `+diff` (removing it shifts every sum in `right` down by `diff`); if 0 lies in `right`, the element is `-diff` and `right` is kept. Since both halves are extracted in sorted order, no re-sorting is needed in later rounds. Repeating this peel-one-element step `n` times recovers the whole array; the loop stops when one sum (necessarily 0) remains.

The pairing never dead-ends: the multiset invariant guarantees that for the correct sign choice, exactly the right multiplicities exist, and any valid answer is accepted. Negative elements, zeros (when the two largest sums are equal, `diff = 0` and both halves are identical), and duplicates all fall out of the same mechanism without special handling.

**Complexity:** `O(2^n * n)` time, `O(2^n)` space.
