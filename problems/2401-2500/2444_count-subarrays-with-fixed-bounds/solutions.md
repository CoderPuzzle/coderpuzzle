# Solutions — Count Subarrays With Fixed Bounds

## Sliding Window with Last-Occurrence Markers

Count subarrays by their right endpoint. A subarray ending at `i` qualifies exactly when it contains at least one `minK`, at least one `maxK`, and no element outside `[minK, maxK]`. All three conditions are summarized by three indices maintained in one left-to-right sweep: `last_bad` is the most recent position of an out-of-range element (any qualifying subarray must start after it), while `last_min` and `last_max` are the most recent positions of `minK` and `maxK` values.

For the right endpoint `i`, a start index `s` yields a fixed-bound subarray precisely when `s > last_bad` and `s <= min(last_min, last_max)`: starting at or before the later of the two marker occurrences guarantees both extreme values are included, and starting after every bad element keeps the range clean. The number of valid starts is therefore `min(last_min, last_max) - last_bad`, clamped at zero. Summing this over all `i` counts every subarray exactly once, because each is attributed to its own right end.

![The example array 1, 3, 5, 2, 7, 5 with marker positions per right endpoint: at i = 2 and i = 3 the single valid start is index 0, bracketed between last_bad and the min of the two extreme markers; the out-of-range 7 then sets last_bad and kills both later terms, totalling 2.](figures/solution-marker-sweep.svg)

The subtle correctness point is why only the _last_ occurrences matter. Extending the window rightward only ever moves the markers forward, and a start position that includes the last `minK` and last `maxK` automatically includes all earlier occurrences of both. The `max(0, ...)` clamp handles prefixes where one extreme has not appeared yet (marker still `-1`) or where a bad element sits after both markers, in which case no valid subarray ends here.

Each element updates the markers in constant time and contributes one term, so a single pass suffices. The count can reach roughly `n^2/2` (about `5·10^9`), which Python integers absorb natively.

**Complexity:** `O(n)` time, `O(1)` space.
