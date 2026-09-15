# Solutions — Split Array With Minimum Difference

## Monotone anchors and one running scan

Whether a split is legal hangs on just two monotone stretches of the array.
The left part `nums[0..i]` is strictly increasing exactly when `i` does not
pass the end of the longest strictly increasing prefix; call that anchor
`e`. Symmetrically, the right part `nums[i+1..n-1]` is strictly decreasing
exactly when `i + 1` does not fall short of the start of the longest
strictly decreasing suffix; call that anchor `s`. Two short linear scans,
one from each end, pin both anchors down, and a split after `i` is valid
precisely when `i + 1 >= s` and `i <= e`.

Scoring the splits then takes one pass: walk `i` from `0` to `n - 2`
accumulating the left sum, read the right sum as the total minus it, and
keep the smallest absolute difference over the indices inside the anchor
window. An empty window never records anything, so the method returns the
`-1` sentinel untouched. The window holds at most two indices — an
increasing prefix and a decreasing suffix cannot share two elements — but
no special casing is needed; the scan simply finds one or two candidates.

Sums reach `n · max(nums) = 10¹⁰`, past the 32-bit range, so fixed-width
languages accumulate in 64-bit integers. The doubled left sums and the
differences stay far inside 64 bits and well below `2⁵³`, which keeps
JavaScript's plain numbers exact.

**Complexity:** `O(n)` time, `O(1)` space.
