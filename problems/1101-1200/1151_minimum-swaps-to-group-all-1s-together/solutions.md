# Solutions — Minimum Swaps to Group All 1's Together

## Sliding Window of Fixed Size

The grouped block must contain every 1, so its length is fixed at `ones = sum(data)`, and only its position varies. A swap exchanges a 0 inside the block with a 1 outside it, so the number of swaps needed to perfect a window is exactly its count of zeros; one swap fixes one zero. The answer is therefore the minimum zero count over all windows of length `ones`.

Compute the zeros in the first window directly with a count, then slide the window one position at a time: the entering element `data[i]` adds `1 - data[i]` zeros and the leaving element `data[i - ones]` subtracts `1 - data[i - ones]`, keeping the tally exact without rescanning. Track the minimum as the window walks to the right end of the array.

Two edge cases short-circuit before the loop: if `ones <= 1` the 1's are trivially grouped (or the array is all zeros) and no swap is needed. An array that is all 1s gives a window with zero zeros, matching the no-swap answer. Since each element is touched a constant number of times, a 10^5-element array scans in one pass.

**Complexity:** `O(n)` time, `O(1)` space.
