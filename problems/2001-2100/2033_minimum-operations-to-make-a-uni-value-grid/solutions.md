# Solutions — Minimum Operations to Make a Uni-Value Grid

## Remainder check and median

Adding or subtracting `x` never changes a value's remainder modulo `x`, so all flattened grid values must share the first value's remainder; otherwise the answer is `-1`. When they do, dividing every distance by `x` turns the problem into minimizing the sum of absolute distances to one target.

Sort the flattened values and choose a median, which minimizes that absolute-distance sum; either middle value is optimal when the count is even. Sum `abs(value - median) / x` for every cell. Fixed-width implementations accumulate this sum in 64 bits before returning the result.

**Complexity:** `O(N log N)` time, `O(N)` space, where `N = m * n`.
