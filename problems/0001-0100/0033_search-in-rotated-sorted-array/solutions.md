# Solutions — Search in Rotated Sorted Array

Two searches living off the same fact: a single cut leaves exactly one
seam, so at every midpoint at least one half of the window is still in
plain ascending order. The two-stage search exploits it once and for
all — a first binary search pins the seam down by locating the array's
smallest value, after which the array is two ordinary sorted runs and a
plain binary search runs in whichever run can hold the target. The
single pass exploits that locally instead, asking at each step which
half the seam spares and whether that half's bounds admit the target.

## Find the Pivot, Then Binary Search

The rotation is cheaper to undo than to work around. The array is two
ascending runs joined at a single drop, and the smallest value sits exactly at
the join — so locating that value settles the seam once, up front. Locating it
is itself a binary search: compare any window's midpoint with its last value. A
midpoint above the last value has the drop somewhere to its right, so the
minimum lies beyond the midpoint; otherwise it lies at the midpoint or to its
left. Distinct values are what make the comparison readable, since equality
never occurs. An uncut array never shows a drop, and the window closes in on
index 0.

With the pivot fixed, the geometry is gone. From the pivot to the end the
values climb from `nums[pivot]` to `nums[n-1]`, and everything before the
pivot is larger than all of that — the cut merely moved the top of the sorted
order out front. One test against the back run's span therefore routes the
target: inside `nums[pivot]..nums[n-1]` it can only be in the back run;
outside that span it can only be in the front one. Either interval is
genuinely ascending, so the second search is the plain one — midpoint, compare,
halve — with no further thought about rotation, and an emptied window at the
end is the `-1` case.

Follow `nums = [12,15,20,26,3,8,9]` with `target = 3`. The minimum search
halves `[0..6]` to `[4..6]` to `[4..5]` to `[4..4]`, landing on the 3 at index
4 — the seam. The back run spans 3 to 9 and the target sits at its edge, so
the plain search runs over `[4..6]`, rejects the 8 at its midpoint, and settles
on index 4. A target like 45 in `[30,40,50,10,20]` falls outside the back
run's span of 10 to 20, so the plain search runs over the front run
`[30,40,50]` instead and ends with the window empty.

Two binary searches, and the state is a few index variables either way.

**Complexity:** `O(log n)` time, `O(1)` space.

## Modified binary search on the sorted half

A rotated sorted array with distinct values has one property binary search can still ride on: inside any window `[lo, hi]`, the midpoint splits the window into two halves and **at least one of them is properly sorted**. Compare `nums[lo] <= nums[mid]` to find which — the `<=` matters for the degenerate case where the window is so small that `lo` and `mid` coincide, and for an unrotated array the test simply always picks the left half.

Once the sorted half is identified, its value range is exactly known (`nums[lo]..nums[mid]` or `nums[mid]..nums[hi]`), so a single containment test decides whether `target` can live there: if it does, keep that half; if not, the target — if present at all — must be in the other half. Each step halves the window; the loop ends when the target is found or the window empties (`-1`). Because all values are distinct, the range tests never straddle the rotation point ambiguously.

![The window halves [0..6] -> [4..6] -> [4..4] for nums = [4,5,6,7,0,1,2] and target 0, each step keeping the sorted half that can contain the target.](figures/solution-binary-search-halving.svg)

The window halves every iteration and only a handful of index variables are kept.

**Complexity:** `O(log n)` time, `O(1)` space.
