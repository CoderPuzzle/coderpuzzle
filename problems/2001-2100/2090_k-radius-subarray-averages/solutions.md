# Solutions — K Radius Subarray Averages

## Maintain one fixed-width window sum

Initialize every answer to `-1`. If the required width `2 * k + 1` fits, sum the first window with a 64-bit accumulator and store its integer average at center `k`. Then slide the window one position at a time, adding the new rightmost value and removing the old leftmost value before filling the next center.

Each element enters and leaves the running sum at most once. The returned array takes linear space, while the sliding-window state itself is constant-sized.

**Complexity:** `O(n)` time, `O(n)` output space, and `O(1)` auxiliary space.
