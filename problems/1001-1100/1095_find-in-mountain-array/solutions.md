# Solutions — Find in Mountain Array

## Triple binary search

The array's shape is the whole problem: sorted ascending, one peak, sorted descending. Each of those three facts is searchable in logarithmic time through `get`, and `length()` is free.

**Finding the peak.** The predicate `get(mid - 1) < get(mid)` is monotone — true everywhere left of (and at) the peak, false afterwards — so a binary search for its last true occurrence pinpoints the peak. Each step costs two `get` calls, about `2 log n` in total. The final `lo` is the peak index because the strictly-rising prefix guarantees exactly one sign change.

**Searching the slopes.** Left of the peak the array is an ordinary ascending array: binary search for the smallest index with value `>= target`, then confirm equality. Searching this slope first is what makes the answer the _minimum_ index — any hit there precedes every index on the right slope, so the search can return immediately. Only on a miss does the mirrored search run on the strictly descending right slope (smallest index with value `<= target`, confirm equality). A miss on both slopes yields `-1`.

For `n = 10⁴` the three searches together make roughly `4 log n ≈ 55` calls to `get` — comfortably inside the 100-call budget, while any linear scan would blow it by two orders of magnitude.

**Complexity:** `O(log n)` time, `O(1)` space.
