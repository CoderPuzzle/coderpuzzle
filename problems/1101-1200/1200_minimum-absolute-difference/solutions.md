# Solutions — Minimum Absolute Difference

## Sort, then scan neighbours

The two closest values in `arr` must end up adjacent once the array is
sorted, so sorting first reduces a quadratic pair search to a single linear
scan of neighbours. After sorting, the minimum absolute difference over all
pairs equals the minimum `arr[i+1] - arr[i]`, because any non-adjacent pair
spans at least the gaps between it.

The scan runs twice in one pass in practice: track the smallest gap seen so
far, resetting the collected pairs whenever a strictly smaller gap appears,
and appending whenever the current gap equals the running minimum. Since the
array is already in ascending order, each emitted pair `[arr[i], arr[i+1]]`
is already `a < b`, and the pairs themselves come out in ascending order —
no second sort and no deduplication needed, as the values are distinct.

**Complexity:** `O(n log n)` time for the sort dominating the linear scan,
`O(n)` space for the output (and the sort itself).
