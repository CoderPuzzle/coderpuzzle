# Solutions — Maximum Total Beauty of the Gardens

## Try every complete-count; water-fill the rest with what's left

If k gardens end up complete, an optimal choice completes the k gardens that
already have the most flowers — sorted descending, completing them is as
cheap as any other choice and leaves the largest budget. So sort ascending,
and sweep k = 0…n: the cost to add one more complete garden comes straight
off a suffix walk, spending `target − flowers[i]` per newly completed garden
until the budget runs out.

For each fixed k, maximizing the minimum of the remaining n − k gardens is a
water-filling problem: raising everyone to level L costs (number of gardens
below L) × L minus their prefix sum, which binary search on L answers in one
O(log n) query via bisect over the sorted array. The best answer over all k
is `k × full + min × partial`; when every remaining garden already sits at or
above target, that split is dominated by completing everything for free, so
the partial term never miscounts. Budgets reach `10¹⁰` and totals `10¹⁰`, so
all arithmetic runs through 64-bit integers — JavaScript's plain numbers stay
exact because both bounds sit below `2⁵³`.

**Complexity:** `O(n log n + n log target)` time, `O(n)` space.
