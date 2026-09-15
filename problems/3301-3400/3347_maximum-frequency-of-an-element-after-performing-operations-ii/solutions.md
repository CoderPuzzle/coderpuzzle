# Solutions — Maximum Frequency of an Element After Performing Operations II

## Event Sweep over Reachable Values

The scoring rule per target value `v` is the heart of it: every element in
`[v - k, v + k]` can be brought to `v`, elements already equal to `v` for
free and each other one for exactly one operation, and since
`numOperations <= n` any unused operations are spent as `+0` on leftover
indices. So the best frequency at `v` is exactly
`min(window(v), count(v) + numOperations)`, window being the count of
elements in the reach interval and count the elements already there.

With values up to `10⁹` the target range is far too wide to sweep every
integer, so the search visits only the breakpoints the window can pivot
on. If the optimal target is an existing element, `v = nums[i]` covers it.
If it is not, the frequency comes purely from the window, and sliding the
target up to `x + k`, where `x` is the smallest element of that window,
keeps every window member (they all sit within `k` of `x` after the slide)
while losing nobody on the left — so `v = nums[i] + k` also always
contains an optimum. `nums[i] - k` is kept as the symmetric guard, giving
the three candidates of the hint. Sorting the array and scoring each
candidate with two binary searches (window and exact count) keeps the
whole pass at `O(n log n)`.

The one numeric care: window bounds `v ± k` reach `3 × 10⁹`, past 32-bit
range, so the fixed-width languages run the search limits in 64-bit
integers. No products are ever formed — the counts themselves stay below
`10⁵` — and in JavaScript every value involved stays far below `2^53`, so
plain `Number` arithmetic is exact.

**Complexity:** `O(n log n)` time, `O(1)` extra space (sorting in place).
