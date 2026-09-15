# Solutions — Count Subarrays With Cost Less Than or Equal to K

A sliding window whose ends crawl forward once, with monotonic deques
answering "what are this window's max and min" in constant time.

## Sliding window with monotonic deques

Extending a window on either side can only raise its maximum, lower its
minimum, and lengthen it, so the cost `(max - min) * length` never decreases
as the window grows. For a fixed right end `r` there is therefore a smallest
left end `l(r)` whose window is still affordable, and every subarray ending
at `r` that starts at `l(r)` or later is affordable too — each shrinks the
value spread and the length together — so exactly `r - l(r) + 1` valid
subarrays end at `r`. The same monotonicity also makes `l(r)` non-decreasing
in `r`, since widening on the right only makes windows more expensive: one
two-pointer sweep counts the whole array as `left` advances across each
`r - left + 1`.

Both window extremes are maintained by monotonic deques of indices: the
max-deque keeps candidate indices with strictly usable values in decreasing
order, the min-deque in increasing order. Pushing `nums[r]` pops every
dominated entry off each back — an element can never be the extreme of a
future window once a newer, more extreme element sits behind it — and when
`left` moves past a deque's front index, that front is evicted. The window
cost is then just the two front values times the current length, so the
shrink loop runs in O(1) amortized per step and every index enters and
leaves each deque at most once. A single element always costs 0 ≤ k, so the
loop is guaranteed to stop before `left` passes `right`.

Bounds force 64-bit arithmetic: at n = 10⁵ the count of subarrays reaches
n·(n+1)/2 = 5,000,050,000, past the 32-bit ceiling, so the accumulator and
the return are 64-bit everywhere. The cost comparison itself stays well
inside fixed-width range — `(max - min)` is at most 10⁹−1 and the length at
most 10⁵, so the product is under 10¹⁴ and k is at most 10¹⁵, both orders of
magnitude below the i64 ceiling of 9.2×10¹⁸. Those same bounds keep
JavaScript exact: every value, cost, and the final count sit far below
2⁵³ ≈ 9.0×10¹⁵, where doubles represent integers exactly.

**Complexity:** `O(n)` time, `O(n)` space.
