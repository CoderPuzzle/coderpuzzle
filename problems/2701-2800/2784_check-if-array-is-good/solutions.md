# Solutions — Check if Array is Good

## Sort against the constructed base

The maximum element pins the problem down. If `nums` is a permutation of some `base[m]`, its largest value must be `m` itself: every entry of `base[m]` is at most `m`, and `m` occurs in it twice. So once the maximum is read off there are no candidate arrays left to consider — only one `base` could possibly match, and checking it is a pure multiset comparison.

That check is two comparisons. A `base[m]` always has length `m + 1`, so an array whose length disagrees with `max + 1` (Example 1, or a lone `[200]`) is rejected before any work. Otherwise, sort a copy of `nums` and compare it against the literally constructed `[1, 2, ..., m - 1, m, m]`: the ascending values `1` through `m - 1`, then two copies of `m`. Any defect shows up as a mismatch — a missing middle value, a duplicated non-maximum, or extra elements beyond the implied length.

The smallest case falls out naturally rather than needing special treatment: for `m = 1` the ascending range is empty and the expected array is just `[1, 1]`, which is exactly `base[1]`, so `[1, 1]` passes while `[1]` fails the length guard. Sorting dominates the cost; building and comparing the expected array is linear.

**Complexity:** `O(n log n)` time, `O(n)` space.
