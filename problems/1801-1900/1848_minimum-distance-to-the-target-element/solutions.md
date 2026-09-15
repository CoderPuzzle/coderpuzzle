# Solutions — Minimum Distance to the Target Element

`target` is guaranteed present, and distances from a fixed `start` are
symmetric, so no search order matters — every occurrence is one linear
scan away from consideration.

## Scan all indices, keep the minimum distance

Walk the array once; whenever `nums[i]` equals `target`, compare
`abs(i - start)` against the running minimum. The guarantee that `target`
exists means some comparison always fires, so the initial sentinel (the
array length, larger than any reachable distance since
`abs(i - start) <= n - 1`) is always replaced.

Each element is examined exactly once with constant work.

**Complexity:** `O(n)` time, `O(1)` space.
