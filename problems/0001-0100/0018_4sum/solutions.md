# Solutions — 4Sum

## Sort, then nested two pointers

After sorting a copy of the array, fix the two smallest elements of a candidate quadruplet at indexes `i` and `j`, and find the remaining pair with a two-pointer scan over the suffix: `left` just after `j`, `right` at the end. If the running total is below `target` the sum must grow, so `left` moves right; if above, `right` moves left; on `target` the quadruplet is recorded. Working on a sorted array means every emitted `[nums[i], nums[j], nums[left], nums[right]]` is already in ascending order, and sweeping `i` and then `j` left to right emits the quadruplets themselves in ascending lexicographic order, as the statement asks.

Duplicate suppression falls out of the sorted order, at all three levels. Reusing the same value for the first slot would re-find the same triples, so `i` skips forward whenever `nums[i] == nums[i-1]`; `j` does the same one level down, measured against its own start `i + 1` so the two leading values may still be equal. After a hit, both pointers advance and then run past any runs of equal values, so the same pair is never emitted twice for one `(i, j)`.

Values reach ±10⁹ and four of them are added, so intermediate totals reach ±4 × 10⁹, beyond 32-bit range: the fixed-width languages accumulate the running total in a 64-bit type (`long`, `long long`, `i64`; Go's `int` is already 64-bit there), while the emitted quadruplet holds input values and stays at the input width. Sorting costs O(n log n); each of the O(n²) prefix pairs does one linear two-pointer sweep, which dominates.

**Complexity:** `O(n^3)` time, `O(n)` space.
