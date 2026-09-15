# Solutions — Number of Elapsed Seconds Between Two Times

## Seconds since midnight

Parse the two-digit hour, minute, and second fields from each string. Convert
a time to `3600 * hour + 60 * minute + second`, then subtract the start
conversion from the end conversion.

Since both inputs are valid and `endTime` is not earlier, the difference is a
non-negative integer within a day.

**Complexity:** `O(1)` time, `O(1)` space.
